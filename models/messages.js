const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  msg: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Message", messageSchema);
