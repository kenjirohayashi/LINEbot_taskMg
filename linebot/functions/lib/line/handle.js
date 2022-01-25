const Text = require('./textMessage');
const API = require('.././firebase/api');
const line = require('@line/bot-sdk');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
const functions = require('firebase-functions');

// LINE bot
const config = {
  channelSecret: functions.config().line.secret,
  channelAccessToken: functions.config().line.token,
 };

const client = new line.Client(config);

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Tokyo")


exports.config = config;

exports.app = async(event) => {

// ------------------------------------------友達追加された------------------------------------------
  if(event.type === "follow"){ 
    return null;
  }

// ------------------------------------------タスクが完了した---¬---------------------------------------
  if(event.type === "postback"){ 
    const data = JSON.parse(event.postback.data); //オブジェクトデータに変換
    await API.deleteTodo(data.id); //todo削除
    return client.replyMessage(event.replyToken , {
      type :"text",
      text : "お疲れさまです！\n" + data.todoName + "が完了しました。",
    },);
  }

// ------------------------------------------テキスト以外が送信された---¬---------------------------------------
  if(event.type !== "message" || event.message.type !== "text"){  
    return client.replyMessage(event.replyToken, Text.error); 
  }

// ------------------------------------------登録/一覧表示/メニュー---¬---------------------------------------
  switch(event.message.text){
    case "@show":
      const todos = await API.getTodo(event.source.userId);
      if(todos.length==0){ //タスクがない
        return client.replyMessage(event.replyToken, Text.none);
      }
      const list = await API.join(todos);
      return client.replyMessage(event.replyToken, list);

    case "@howto":
      return client.replyMessage(event.replyToken, [Text.howto,Text.menu]); 
      
    default :
      return client.replyMessage(event.replyToken, Text.menu); 
  }
}

exports.registerMessage = (uid, name) => {
  // console.log(uid);
  client.pushMessage(uid ,{
    type :"text",
    text : "「" + name + "」" + "を登録しました！",
  },);
}

exports.reminder = async() => {
  const now = dayjs().tz().format("YYYY/MM/DD HH:mm");
  // console.log(now);
  const todos = await API.remindTodo(now);
  todos.forEach((doc) => {
    client.pushMessage(doc.userId,{
      type:"text",
      text: "「" + doc.todoName + "」"  + "の時間だよ！\n頑張って！！",
    })
  })
}
  