const mongoose = require("mongoose");

const userData = new mongoose.Schema({
    email:String,
    password:String,
    name:String,
})

const UserModel = mongoose.model("user",userData);
module.exports = UserModel