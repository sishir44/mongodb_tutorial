const mongoose = require('mongoose');
const validator = require('validator');

// STEP:I creating a schema
const studentSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength:3
    },
    email: {
        type:String,
        required: true,
        unique:[true, "Email is already present"],
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error(`${value} is Invalid email`);
            }
        }
    },
    phone: {
        type:Number,
        min:10,
        required: true,
        unique:true,
    },
    address: {
        type:String,
        required: true
    }

})

// STEP:II creating a collection using Model
const Student = new mongoose.model("Student",studentSchema);

// export collection from this page to app.js page
module.exports = Student;
