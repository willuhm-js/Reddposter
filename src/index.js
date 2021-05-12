// This file will act as a central point for managing our code.

// Load modules we will need
const fetchPost = require("./reddit.js");
const repackagePost = require("./canvas.js");
const publishPost = require("./instagram.js");
const {interval} = require("./config.js");

let previousPost = { /* title */ }

console.log(`The bot has started with an interval of ${interval} milliseconds`);
setInterval(() => {
  fetchPost(previousPost).then(async post => {
    previousPost.text = post.text;
    let tweet = await repackagePost(post);
    await publishPost(tweet);

    let now = new Date();
    console.log(`New post published at ${now.getHours}:${now.getMinutes}:${now.getMilliseconds}`)
  }).catch(e => console.error(e));
}, interval);