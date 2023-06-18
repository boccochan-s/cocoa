'use strict';

require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');
const env = process.env;

const HOST = '0.0.0.0'
const PORT = '3000'

const config = {
  channelAccessToken: env.CHANNEL_ACCESS_TOKEN,
  channelSecret: env.CHANNEL_SECRET
};

const app = express();

app.listen(PORT, HOST);