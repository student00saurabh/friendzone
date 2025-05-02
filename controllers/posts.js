const { model } = require("mongoose");
const Post = require("../models/posts.js");

module.exports.index = async (req, res) => {
  let search = req.query.q;
  if (search && search != undefined) {
    const allPosts = await Post.find({
      title: { $regex: search, $options: "i" },
    });
    res.render("./posts/index.ejs", { allPosts });
  } else {
    const allPosts = await Post.find({})
      .populate("owner")
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      })
      .populate("likes");
    res.render("./posts/index.ejs", { allPosts });
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("posts/new.ejs");
};

module.exports.showPost = async (req, res) => {
  let { id } = req.params;
  const post = await Post.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "author",
      },
    })
    .populate("likes")
    .populate("owner");
  if (!post) {
    req.flash("error", "Post does not exist!");
    res.redirect("/posts");
  }
  res.render("posts/show.ejs", { post });
};

module.exports.createPost = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newPost = new Post(req.body.post);
  //console.log(newListing);
  newPost.owner = req.user._id;
  newPost.image = { url, filename };
  await newPost.save();
  req.flash("success", "New Post Created!");
  res.redirect("/posts");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    req.flash("error", "Post does not exist!");
    res.redirect("/posts");
  }
  let originalImageUrl = post.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_250,w_300");
  res.render("posts/edit.ejs", { post, originalImageUrl });
};

module.exports.updatePost = async (req, res) => {
  let { id } = req.params;
  let post = await Post.findByIdAndUpdate(id, { ...req.body.post });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    post.image = { url, filename };
    await post.save();
  }

  req.flash("success", "Post Updated!");
  res.redirect(`/posts/${id}`);
};

module.exports.destroyPost = async (req, res) => {
  let { id } = req.params;
  let deletePost = await Post.findByIdAndDelete(id);
  req.flash("success", "Post Deleted!");
  res.redirect("/posts");
};
