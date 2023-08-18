const mongoose = require("mongoose");
require("dotenv").config();
const database = process.env.DATABASE
mongoose.connect(database)
.then( ()=> console.log("connection successfull..."))
.catch((err) => console.log("no connection"));