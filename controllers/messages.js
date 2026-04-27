const User = require("../models/users.js");
const Message = require("../models/messages.js");

module.exports.index = async (req, res) => {
  const allMessages = await Message.find({ receiver: req.user })
    .populate("sender")
    .populate("receiver");
  
  //unique users who have sent messages
  const uniqueSendersMap = new Map();

  allMessages.forEach((msg) => {
    if (msg.sender && !uniqueSendersMap.has(msg.sender._id.toString())) {
      uniqueSendersMap.set(msg.sender._id.toString(), msg.sender);
    }
  });

  const uniqueSenders = Array.from(uniqueSendersMap.values());

  // suggested users
  const sentMessages = await Message.find({ sender: req.user._id });
  const receivedMessages = await Message.find({ receiver: req.user._id });
  const messagedUserIds = new Set();

  sentMessages.forEach((msg) => messagedUserIds.add(msg.receiver.toString()));
  receivedMessages.forEach((msg) => messagedUserIds.add(msg.sender.toString()));
  const suggestedUsers = await User.find({
    _id: { $nin: [...messagedUserIds, req.user._id] },
  });
  
  //unseen messages
  const unSeenMsg = await Message.find({
    receiver: req.user,
    isSeen: false,
  }).populate("sender");
  
  res.render("./messages/index.ejs", {
    uniqueSenders,
    unSeenMsg,
    suggestedUsers,
  });
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
    .sort({ createdAt: 1 })
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

// New: Send message via API (for real-time)
module.exports.sendMessageAPI = async (req, res) => {
  try {
    const { msg } = req.body;
    const receiverId = req.params.id;
    const receiver = await User.findById(receiverId);
    
    const newMsg = new Message({
      msg: msg,
      sender: req.user._id,
      receiver: receiver._id,
      isSeen: false
    });
    
    await newMsg.save();
    
    res.json({ 
      success: true, 
      messageId: newMsg._id,
      message: newMsg
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};