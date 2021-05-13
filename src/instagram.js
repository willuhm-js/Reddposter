// This file will upload our repackaged post to Instagram.
const {IgApiClient} = require("instagram-private-api");
const ig = new IgApiClient();

const {username, password} = require("./config.js");

module.exports = async (file) => {
  ig.state.generateDevice(username);
  await ig.account.login(username, password);
  await ig.publish.photo({
    file,
    caption: "#showerthoughts"
  })
}
