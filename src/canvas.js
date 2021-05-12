// This file will repackage our reddit data onto an image for uploading to Instagram.

const { Canvas, resolveImage } = require("canvas-constructor");
const { registerFont } = require("canvas");
const fs = require("fs"); // todo for testing, delete later
const wt = require("wrap-text");

const Filter = require('bad-words-relaxed');

let filter = new Filter({ placeHolder: 'x'});

let grammarFix = (sentence) => {
  sentence = sentence[0].toUpperCase() + sentence.slice(1);
  if (!sentence.endsWith("!") && !sentence.endsWith(".")) sentence += ".";
  return sentence;
}

registerFont('./src/media/twitter.ttf', { family: 'Twitter' });

module.exports = (post) => {
  let background = resolveImage('./src/media/template.png').then(background => {
    let canvas = new Canvas(720, 300)
    .printImage(background, 0, 0, 720, 300)
    .setColor("#000000")
    .setTextFont('25px Twitter')
    .printText(wt(grammarFix(post.title), 50), 40, 125)
    .setColor("#6A7C8A")
    .setTextFont('20px Twitter')
    .printText(`u/${filter.clean(post.author)}`, 125, 70)
    .toBuffer()

    fs.writeFileSync('file.png', canvas) // testing delete later
  });
};