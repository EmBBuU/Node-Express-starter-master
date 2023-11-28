const Post = require("../models/Post");

exports.getAllPosts = async (req, res, next) => {
  try {
    const [posts, _] = await Post.findAll();
    res.status(200).json({ count: posts.length, posts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewPost = async (req, res, next) => {
  try {
    let { title, body } = req.body;
    let post = new Post(title, body);
    post = await post.save();
    res.status(201).json({ message: "Post created" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    let postId = req.params.id;
    let [post, _] = await Post.findById(postId);
    res.status(200).json({ post: post[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

async function checkIfPostExists(postId) {
  const [existingPost, _] = await Post.findById(postId);
  return existingPost && existingPost.length > 0;
}

exports.updatePostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, body } = req.body;
    let post = new Post(title, body);

    // Check if the post exists before attempting to update
    if (!(await checkIfPostExists(postId))) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Call the update method with individual values
    post = await post.update(postId, title, body);

    res.status(200).json({ message: "Post updated" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deletePostById = async (req, res, next) => {
  try {
    const postId = req.params.id;

    // Check if the post exists before attempting to delete
    if (!(await checkIfPostExists(postId))) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Call the deletePostById method
    await Post.deletePostById(postId);

    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
