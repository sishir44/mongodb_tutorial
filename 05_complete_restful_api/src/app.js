const express = require('express');
require("../src/db/conn");
const MensRanking = require("../src/models/mens");
const router = require("../src/routers/men");

const app = express();
const port = process.env.PORT || 3000;

// call express.json method to get data from postmen as json format
app.use(express.json());

app.use(router); // register router which is export from men.js

app.listen(port, () => {
    console.log(`listening on port number ${port}`);
})