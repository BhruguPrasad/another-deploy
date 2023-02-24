const mongoose = require("mongoose")

const flightsData = new mongoose.Schema({
    airline:String,
    flightNo:String,
    departure:String,
    arrival:String,
    departureTime:Date,
    arrivalTime:Date,
    seats:Number,
    price:Number,
    userId:{type:String,required:true}
})
const FlightsModel = mongoose.model("flight",flightsData)
module.exports = FlightsModel;
// airline: String,
// flightNo: String,
// departure: String,
// arrival: String,
// departureTime: Date,
// arrivalTime: Date,
// seats: Number,
// price: Number