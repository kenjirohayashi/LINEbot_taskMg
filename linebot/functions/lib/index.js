'use strict';

const functions = require('firebase-functions');
const express = require('express');
const line = require('@line/bot-sdk');
const Handle = require('./line/handle');


const app = express();
const config = Handle.config;



exports.main = functions.region("asia-northeast1").https.onRequest(
  app.post('/', line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(Handle.app))
        .then(() => res.status(200).end())
        .catch((err) => {
         console.error(err);
         res.status(500).end()
        })
   })
);

exports.register = functions.region("asia-northeast1")
    .firestore
    .document('todos/{todoId}')
    .onCreate((snap, context) => {
      const userId = snap.data().userId;
      const todoName = snap.data().name;
     return Handle.registerMessage(userId, todoName);
});

exports.reminder = functions.region('asia-northeast1')
.pubsub.schedule('every 1 minutes')
.timeZone('Asia/Tokyo')
.onRun((context) => {
  return Handle.reminder();
})