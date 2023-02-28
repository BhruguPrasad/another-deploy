const express = require("express");
const PostedModel = require("../models/Posted.model");
const PostedRouter = express.Router();

PostedRouter.get("/", async (req, res) => {
    // const airline = req.query
   let { category,order,page } = req.query;
 let data = await PostedModel.find((category)?{category : category}:{},(srh)?{name:srh}:{})
    .sort({
    postedAt: order == "asc" || order == "ASC" ? 1 : -1,
    }).skip((page-1)*4)
    .limit(4);
    res.send(data);
})

PostedRouter.post("/",async (req,res) =>{
    const {name,description,category,image,location,postedAt,price} = req.body;
    const newpost = new PostedModel({
        name,description,category,image,location,postedAt,price
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
