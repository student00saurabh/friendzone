const User = require("../models/users.js");
const Message = require("../models/messages.js");

module.exports.index = async (req, res) => {
  const allMessages = await Message.find()
    .populate({
      path: "sender",
      populate: {
        path: "User",
      },
    })
    .populate({
      path: "receiver",
      populate: {
        path: "User",
      },
    });
  console.log(allMessages);
  res.render("./messages/index.ejs", { allMessages });
};

module.exports.inbox = async (req, res) => {
  res.render("./messages/inbox.ejs");
};
