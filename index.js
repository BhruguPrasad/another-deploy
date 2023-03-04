
const bcrypt = require("bcryptjs/dist/bcrypt")
const express = require("express");
const jwt = require("jsonwebtoken");
const randomWords = require('random-words');
var cors = require('cors')
const UserModel = require("./models/User.model")
const connection = require("./configs/db");

const app = express();
app.use(express.json());
app.use(cors())
require("dotenv").config()
const PORT = process.env.PORT || 3000
app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.get('/randomword', (req, res) => {
    const randomWord = randomWords();
    res.json({word:randomWord});
});
app.post("/api/signup",async(req,res) =>{
    const {email,password,name} = req.body;
    await bcrypt.hash(password,6,function(err,hash){
        if(err){
            return res.send("Signup failure")
        }
        const user = new UserModel({email,password:hash,name})
        user.save()
        return res.json({msg : "Signup is successfull"})
    })
})
app.post("/api/login",async(req,res) =>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email})
    if(!user){
        return res.send("Check credentials")
    }
    const haspassword = user.password
    await bcrypt.compare(password,haspassword,(err,result) =>{
        if(err) {
            return res.send("error")
        }
        if(result==true){
            const token = jwt.sign({email:user.email,_id:user._id},process.env.jwt_secret_key)
            return res.send({message:"Login success",token:token,userId:user._id})
        }
        else{
            return res.send("Error Please Check")
        }
    })
})
const authenticate = (req,res,next) =>{
    if(!req.headers.authorization){
        return res.send("Login First");
    }
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token,process.env.jwt_secret_key,(err,decode) =>{
        if(err){
            return res.send("Login Please");
        }
        next()
    })
}
app.use(authenticate)
app.get("/dashboard",(req,res)=>{
    res.json({message:"You can access"})
})

app.listen(PORT,async () =>{
    try{
        await connection
        console.log("Connect success to db")
    }
    catch(err){
        console.log("connect failure")
    }
})
