const User = require("../models/users.js");
const Message = require("../models/messages.js");

module.exports.index = async (req, res) => {
  const allMessages = await Message.find({ receiver: req.user })
    .populate("sender")
    .populate("receiver");

  const uniqueSendersMap = new Map();

  allMessages.forEach((msg) => {
    if (msg.sender && !uniqueSendersMap.has(msg.sender._id.toString())) {
      uniqueSendersMap.set(msg.sender._id.toString(), msg.sender);
    }
  });

  const uniqueSenders = Array.from(uniqueSendersMap.values());
  const unSeenMsg = await Message.find({
    receiver: req.user,
    isSeen: false,
  }).populate("sender");
  res.render("./messages/index.ejs", { uniqueSenders, unSeenMsg });
};

module.exports.inbox = async (req, res) => {
  const senderId = req.params.id;
  const senderPerson = await User.findById(senderId);

  const allMessages = await Message.find({
    $or: [
      { sender: req.user, receiver: senderPerson },
      { sender: senderPerson, receiver: req.user },
    ],
  })
    .sort({ createdAt: 1 }) // 1 = ascending, -1 = descending
    .populate("sender")
    .populate("receiver");
  await Message.updateMany(
    { sender: senderPerson, receiver: req.user, isSeen: false },
    { $set: { isSeen: true } }
  );
  res.render("./messages/inbox.ejs", { senderId, allMessages, senderPerson });
};

module.exports.sendMessage = async (req, res) => {
  const newMsg = new Message(req.body);
  let id = req.params.id;
  const receiver = await User.findById(`${id}`);
  newMsg.receiver = receiver;
  newMsg.sender = req.user;
  await newMsg.save();
  res.redirect(`/inbox/${id}`);
};
