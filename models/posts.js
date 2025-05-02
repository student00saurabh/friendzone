const mongoose = require("mongoose");

const schema = mongoose.Schema;
const Comment = require("./comments.js");
const Like = require("./likes.js");
const User = require("./users.js");

const postSchema = new schema({
  description: String,
  image: {
    url: String,
    filename: String,
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Like",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// postSchema.post("findOneAndDelete", async (listing) => {
//   if (listing) {
//     await Review.deleteMany({ _id: { $in: listing.reviews } });
//   }
// });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
