const User = require("../models/users.js");
const Message = require("../models/messages.js");

module.exports.index = async (req, res) => {
  const allMessages = await Message.find({})
    .populate({
      path: "sender",
      populate: {
        path: "user",
      },
    })
    .populate({
      path: "receiver",
      populate: {
        path: "user",
      },
    });
  res.render("./messages/index.ejs", { allMessages });
};
