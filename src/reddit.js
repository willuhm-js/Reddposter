// This file will fetch and validate a Reddit post, and return it to our central point.

const redditFetch = require('reddit-fetch');

let fetchPost = async () => {
  let post = await redditFetch({
      subreddit: 'showerthoughts',
      sort: 'hot',
      allowNSFW: false,
      allowModPost: false,
      allowCrossPost: false,
      allowVideo: false

  });
  return post;
}

let execute = async (lastPost) => {
  let post = await fetchPost();
  if (lastPost.title == post.title || post.title.length > 179) {
    execute(lastPost);
  } else {
    return post;
  }
}

module.exports = execute;