
const bcrypt = require("bcrypt/bcrypt")
const express = require("express");
const jwt = require("jsonwebtoken");
var cors = require('cors')

const UserModel = require("./models/User.model")
const connection = require("./configs/db");
const PostedRouter = require("./routes/Posted.routes");
const app = express(); 
app.use(cors())
const PORT = process.env.PORT || 8080
app.use(express.json());
require("dotenv").config()

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.post("/signup", (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, 5, async function(err, hash) {
        if(err){
            res.send("Something went wrong")
        }
        const user = new UserModel({
            name,
            email,
            password : hash
        })
        try{
            await user.save()
            res.json({msg : "Signup is successfull"})
        }
        catch(err){
            console.log(err)
            res.send("Something wrong")
        }
    });
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    const hash = user.password
    bcrypt.compare(password, hash, function(err, result) {
        if(err){
            res.send("Something went wrong")
        }
        if(result){
            const token = jwt.sign({ userId : user._id }, process.env.jwt_secret_key);
            res.json({message : "Login Successfull",token})
        }
        else{
            res.send("Invalid Credentials")
        }
    });
})
app.use("/classified",PostedRouter)
app.listen(PORT,async () =>{
    try{
        await connection
        console.log("Connect Success to db")
    }
    catch(err){
        console.log("connect failure")
    }
})
