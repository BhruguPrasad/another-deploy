const mongoose = require("mongoose");

const SprintSchema = new mongoose.Schema({
    sprint: String
});
  
const SprintModel = mongoose.model('Sprint', SprintSchema);

module.exports = SprintModel