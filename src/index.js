// This file will act as a central point for managing our code.

// Load modules we will need
const fetchPost = require("./reddit.js");
const repackagePost = require("./canvas.js");
const publishPost = require("./instagram.js");
const { interval } = require("./config.js");
const fs = require("fs");

let previousPost = { /* title */ }

console.log(`The bot has started with an interval of ${interval} milliseconds.`);
setInterval(() => {
  let previous = +fs.readFileSync(`${__dirname}/timeManager.txt`)
  if (Date.now() > (previous + interval)) {
    fs.writeFileSync(`${__dirname}/timeManager.txt`, Date.now())
    fetchPost(previousPost).then(async post => {
      previousPost.text = post.text;
      let tweet = await repackagePost(post);
      await publishPost(tweet);
      console.log(`New post made [${Date.now()}]`)
    }).catch(e => console.error(e));
  }
}, 1000);