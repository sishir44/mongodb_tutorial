const express = require('express');
const router = new express.Router(); // creating a router
const MensRanking = require("../models/mens");

// Handling a post request
router.post("/mens", async (req, res) => {
    try {
        const addingMensRecord = new MensRanking(req.body)
        console.log(req.body);
        const insertMens = await addingMensRecord.save();
        res.status(201).send(insertMens);
    } catch (err) {
        res.status(400).send(err);
    }
})

// Handling a get request
router.get("/mens", async (req, res) => {
    try {
        const getMens= await MensRanking.find({}).sort({"ranking":1});
        res.send(getMens);
    } catch (err) {
        res.status(400).send(err);
    }
})

// Handling a get request for partular Id
router.get("/mens/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const getMen= await MensRanking.findById(_id);
        res.send(getMen);
    } catch (err) {
        res.status(400).send(err);
    }
})

// Handling a patch request
router.patch("/mens/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const patchMen= await MensRanking.findByIdAndUpdate(_id, req.body, {new:true});
        res.send(patchMen);
    } catch (err) {
        res.status(500).send(err);
    }
})

// Handling a delete request
router.patch("/mens/:id", async (req, res) => {
    try {
        const deleteMen= await MensRanking.findByIdAndDelete(req.params.id);
        res.send(deleteMen);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;