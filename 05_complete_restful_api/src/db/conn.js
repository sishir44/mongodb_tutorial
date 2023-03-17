const mongoose = require('mongoose');

// connection creation
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/olympic", {
    useNewUrlParser: true , 
    useUnifiedTopology: true 
})
.then( () => console.log("connection successfully...."))
.catch( (err) => console.log(err));
