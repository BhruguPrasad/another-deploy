const mongoose = require("mongoose");

const Taskschema = new mongoose.Schema({
    name: String,
    description: String,
    type: String, 
    assignee: String,
    sprint:String,
    status: String
  });
  
  const TaskModel = mongoose.model('Task', Taskschema);
  module.exports=TaskModel