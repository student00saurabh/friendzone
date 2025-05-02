const mongoose = require("mongoose");
const initData = require("./data");
const Post = require("../models/posts.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/friendzone";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Post.deleteMany({});
  //   initData.data = initData.data.map((obj) => ({
  //     ...obj,
  //     owner: "67f7991df9ff483ff0d562f1",
  //   }));
  await Post.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
