const mongoose = require("mongoose")

const postedData = new mongoose.Schema({
    name:String,
    position:String,
    contract:String,
    location:String,
})
const postedModel = mongoose.model("posted",postedData)
module.exports = postedModel;
