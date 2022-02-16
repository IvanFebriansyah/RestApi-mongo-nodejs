const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();

// posts models
const Posts = require("../../models/Posts");

// @routes GET api/posts
// @desc Create All post
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    if (!posts) throw Error("No Items");
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// @routes POST api/posts
// @desc Create An post
router.post("/", async (req, res) => {
  const newPost = new Posts(req.body);

  try {
    const post = await newPost.save();
    if (!post) throw Error("Something went wrong while saving the post");
    res.status(200).json(post);
  } catch {
    res.status(400).json({ msg: err });
  }
});

// @routes DELETE api/posts/:id
// @desc delete An post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    if (!post) throw Error("No post found!");
    res.status(200).json({ succes: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// @routes UPDATE api/posts/:id
// @desc update An post
router.patch("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
    if (!post) throw Error("Something went wrong while updating the post!");

    res.status(200).json({ succes: true });
  } catch (err) {
    res.status(4000).json({ msg: err });
  }
});

module.exports = router;
