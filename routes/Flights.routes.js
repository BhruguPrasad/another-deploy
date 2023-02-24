const express = require("express");
// const FlightsModel = require("../models/Notes.model");
const FlightsModel = require("../models/Flights.model");
const flightsRouter = express.Router();

flightsRouter.get("/", async (req, res) => {
    // const airline = req.query
    const flight = await FlightsModel.find()
    res.send(flight)
})

flightsRouter.get("/:userId",async(req,res) =>{
    const userId = req.params.userId
    const flights = await FlightsModel.find({userId})
    res.send(flights)
})

flightsRouter.post("/",async (req,res) =>{
    const {flightNo,airline,departure,arrival,departureTime,arrivalTime,seats,price,userId} = req.body;
    const newflight = new FlightsModel({
        flightNo,airline,departure,arrival,departureTime,arrivalTime,seats,price,userId
    })
    await newflight.save()
    res.send({message:"flights created successfully",newflight})
})

flightsRouter.patch("/:userId",async (req,res) =>{
    const noteId = req.params.userId
    
    const newnote =await FlightsModel.findOneAndUpdate({_id : noteId, userId : req.body.userId},req.body)
    if(newnote){
        res.send("Update")
    }
    else{
        res.send("couldn't update")
    }
})
flightsRouter.delete("/:userId",async (req,res) =>{
    const noteId = req.params.userId
    
    const newnote =await FlightsModel.findOneAndDelete({_id : noteId, userId : req.body.userId})
    if(newnote){
        res.send("Delete")
    }
    else{
        res.send("couldn't Delete")
    }
})

module.exports = flightsRouter