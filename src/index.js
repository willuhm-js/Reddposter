// This file will act primarily as a central point for managing our code.

// Load modules we will need
const fetchPost = require("./reddit.js");
const repackagePost = require("./canvas.js");
const publishPost = require("./instagram.js");

let previousPost = { /* id */ }

const fs = require("fs")

fetchPost(previousPost).then(async post => {
  previousPost.id = post.id;
  let tweet = await repackagePost(post);
});
