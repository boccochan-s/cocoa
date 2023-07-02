'use strict';

require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const app = express();
app.get('/', (req, res) => res.send('WELCOME TO COCOA LINEBOT!'));
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    Promiss.resolve(null);
  }

  const recipeURL = `にゃー$、「${event.message.text}」!!\nそれならこんなレシピはどうかにゃ？\nhttps://cookpad.com/search/${event.message.text}`;

  const replyDetail = {
    type: 'text',
    text: recipeURL,
    emojis: getRandomCatEmoji()
  };
  console.log('replyDetail: ' + JSON.stringify(replyDetail));

  return client.replyMessage(event.replyToken, replyDetail);
}

function getRandomCatEmoji() {
  const eID = (Math.floor(Math.random() * 10) + 1).toString().padStart(3, '0');

  const emojis = [{
    index: 3,
    productId: '5ac21184040ab15980c9b43a',
    emojiId: eID
  }];
  console.log('emoji: ' + JSON.stringify(emojis));

  return emojis;
}

app.listen(process.env.PORT || 3000);
console.log(`The server is running. The port is at ${process.env.PORT}!`);