const express = require('express');
const router = new express.Router();
const Student = require("../models/students");


// register a new student in postman
router.post("/students",async(req,res) => {
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(200).send(createUser); 

    } catch (err) {
        res.status(401).send(err);
    }
})


//get the data of registered students
router.get("/students",async(req,res) =>{
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (err) {
        res.send(err);
    }
})


//get the individual students data using id
router.get("/students/:id",async(req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        
        if(!studentData) {
            return res.status(404).send();
        } else {
            res.send(studentData);
        }       
    } catch (err) {
        res.send(err);
    }
})

// update the students by Id
router.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body,{new : true});
        res.send(updateStudents);
    } catch (err) {
        res.status(404).send();
    }
})


// delete the students by Id
router.delete("/students/:id", async(req, res) =>{
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id) {
            return res.status(400).send();
        }
        res.send(deleteStudent);
    } catch (err) {
        res.status(404).send(err);
    }
})

module.exports = router;