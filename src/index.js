// This file will act as a central point for managing our code.

// Load modules we will need
const fetchPost = require("./reddit.js");
const repackagePost = require("./canvas.js");
const publishPost = require("./instagram.js");

let previousPost = { /* title */ }

fetchPost(previousPost).then(async post => {
  previousPost.text = post.text;
  let tweet = await repackagePost(post);
  publishPost(tweet)
});
