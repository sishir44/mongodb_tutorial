const mongoose = require('mongoose');
const validator = require('validator');

// connection creation
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/shira", { useNewUrlParser: true }, { useUnifiedTopology: true })
.then( () => console.log("connection successfully...."))
.catch( (err) => console.log(err));


//structure of Schema
const playlistSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,   // not validation but acts as validation
        uppercase: true,   // validation
        trim: true,     // validation
        minlength:[2,"length of name should ne min two error message! "],   // validation
        maxlength: 30    // validation
    },
    ctype: {
        type:String,
        required: true, // validation
        lowercase: true, // validation
        enum:["frontend", "backend","database"]   // validation
    },
    videos: {
        type:Number,
        validate(value) {   // custom validation
            if(value < 0) {
                throw new Error("Video count should not be negative");
            }
        }
    },
    email: {
        type:String,
        required: true, // validation
        unique: true, // validation
        lowercase: true,
        validate(value) {  //custom validation
            if (!validator.isEmail(value)) {  //npm validation
                throw new Error ("Email is Invalid!")
            }
        }
    },
    author:String,
    active:Boolean,
    date: {
        type:Date,
        default:Date.now
    }
})


// Creating collection {make sure collection name must be in Singular form} i.e 's' shouldn't be in last and first letter should be Capital letters
const Playlist = new mongoose.model("Playlist", playlistSchema);


// create document and adding document on collection
const createDocument = async () => {
    try {
        const NodePlaylist = new Playlist({
            name:"               NoDe. jS              ",
            ctype:"backend",
            videos:5,
            email:"sishi@gmail.com",
            author:"Techy Sishir",
            active:true
        })
        //insert only one document we use below code to show result
        const result = await NodePlaylist.save();
        console.log(result);

        // const JsPlaylist = new Playlist({
        //     name:"Javascript",
        //     ctype:"Front End",
        //     videos:65,
        //     author:"Techy Sishir",
        //     active:true
        // })
        // const mongoPlaylist = new Playlist({
        //     name:"Mongodb",
        //     ctype:"Database",
        //     videos:55,
        //     author:"Techy Sishir",
        //     active:true
        // })
        // const expressPlaylist = new Playlist({
        //     name:"Express",
        //     ctype:"Nodejs Framework backend",
        //     videos:50,
        //     author:"Techy Sishir",
        //     active:true
        // })
        // const reactPlaylist = new Playlist({
        //     name:"Js  framework",
        //     ctype:"Back End",
        //     videos:60,
        //     author:"Techy Sishir",
        //     active:true
        // })
        // // to get multiple document we use 
        // const result = await Playlist.insertMany([NodePlaylist,JsPlaylist,mongoPlaylist,expressPlaylist,reactPlaylist])
        // console.log(result);
    }
    catch(err) {
        console.log(err);
    }
}
createDocument();


//Read or Querying the Documents
const readDocument = async () => {
    try {
        const result = await Playlist
        //.find();
        //.find({ctype:"Nodejs Framework backend"});
        //.find({ctype:"Nodejs Framework backend"}).select({name:1}); 

        //.find({videos:{$gt:50}}); //Comparison Operators
        //.find({$or: [{ctype:"Back End"},{author:"Techy Sishir"}]}); // Logical operators

        //.find({author:"Techy Sishir"}).count(); // counting the documents   OR
        //.find({author:"Techy Sishir"}).countDocuments(); // counting the documents

        //.find({author:"Techy Sishir"}).select({name:1}).sort({name:1}); // sorting by ascending
        //.find({author:"Techy Sishir"}).select({name:1}).sort({name:-1}); // sorting by descending
   
        console.log(result);
    } 
    catch(err) {
        console.log(err);
    }
}
//readDocument();


// Update the Document by ID.
const updateDocument = async (_id) => {
    try {
        //const result = await Playlist.updateOne({_id},{$set: {name:"Js Framework"}}) //update document
        const result = await Playlist.findByIdAndUpdate({_id},{$set: {name:"Js Framework"}},{new:true}) //update document

        console.log(result);
    }
    catch(err) {
        console.log(err);
    }
}
//updateDocument("63fae3e8d9fc191bde1212ba");


// Delete the Documents
const deleteDocument = async (_id) => {
    try {
        //const result = await Playlist.deleteOne({_id}); //delete the document
        const result = await Playlist.findByIdAndDelete({_id}) // delete document
        console.log(result);
    }
    catch(err) {
        console.log(err);
    }
}
//deleteDocument("63fae3e8d9fc191bde1212b6")