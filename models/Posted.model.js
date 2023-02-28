const mongoose = require("mongoose")

const postedData = new mongoose.Schema({
    name:String,
    description:String,
    category:String,
    image:String,
    location:String,
    postedAt:Date,
    price:Number,
})
const postedModel = mongoose.model("flight",postedData)
module.exports = postedModel;
//      "name": "Nike Air",
// 		"description" : "Almost brand new, rarely used",
// 		"category" : "clothing",
// 		"image" : "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7fbc5e94-8d49-4730-a280-f19d3cfad0b0/custom-nike-air-max-90-by-you.png",
// 		"location" : "india",
// 		"postedAt" : "2023-02-01",
// 		"price" : "7999"