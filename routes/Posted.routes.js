const express = require("express");
const PostedModel = require("../models/Posted.model");
const PostedRouter = express.Router();

PostedRouter.get("/", async (req, res) => {
    let {contract,location,search} = req.query;
    let data ;
    if(contract){
       data = await PostedModel.find((contract)?{contract : contract}:{})
    }else if(location){
       data = await PostedModel.find((location)?{location:location}:{})
    }else if(search){
       data =  await PostedModel.find((search)?{name : search}:{})
    }
    res.send(data);
})

PostedRouter.post("/",async (req,res) =>{
    const {name,position,contract,location} = req.body;
    const newpost = new PostedModel({
        name,position,contract,location
    })
    await newpost.save()
    res.send({message:"Posted created successfully",newpost})
})

PostedRouter.delete("/:userId",async (req,res) =>{
    const noteId = req.params.userId
    const newnote =await PostedModel.findOneAndDelete({_id : noteId})
    if(newnote){
        res.send("Delete")
    }
    else{
        res.send("couldn't Delete")
    }
})

module.exports = PostedRouter
