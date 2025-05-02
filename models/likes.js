const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  cliker: {
    type: String,
    ref: required,
  },
});

module.exports = mongoose.model("Like", likeSchema);
