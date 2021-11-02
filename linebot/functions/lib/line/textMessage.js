module.exports = {
 menu:{ 
    "type": "template",
    "altText": "メニュー",
    "template": {
        "type": "confirm",
        "text": "メニュー",
        "actions": [
            {
              "type": "uri",
              "label": "登録",
              "uri": "https://liff.line.me/1656516684-OwVyK4zN"
            },
            {
              "type": "message",
              "label": "確認",
              "text": "@show"
            }
        ]
    }
 },
 register:{
   "type": "action",
   "action": {
      "type": "uri",
      "label": "登録",
      "uri": "https://liff.line.me/1656516684-OwVyK4zN"
   }
 },
 none : {
    type : "text",
    text : "タスクはありません。気楽にいきましょう！",
 },
 error : {
    type : "text",
    text : "ちょっと何言ってるかわかんないっす",
 },
 howto :{
    type : "text",
    text : "使い方\n・登録\n\"登録\"と送信してください!\n一覧表示\n\"@show\"と送信してください!\n\リッチメニューから簡単に操作できます！！",
    quickReply: {
      items: [
         {
             type: "action",
             action: {
                 type: "uri",
                 label: "登録",
                 uri: "https://liff.line.me/1656516684-OwVyK4zN"
             }
         },
         {
            type: "text",
            text: "@show",
         },
         {
            type: "action",
            action: {
               type: "uri",
               label: "友だちに勧める",
               uri: "https://line.me/R/nv/recommendOA/@linedevelopers"
            }
         }
      ]
  }
 },
  // deadLine : {
  //     type :"text",
  //     text :"締め切りは？ \nmm/ddもしくはmm月dd日の形で送信してね！\n「キャンセル」で取り消すこともできるよ"
  // },
  // cancel : {
  //     type :"text",
  //     text :"キャンセルしたよ！",
  // },
  // invalid : {
  //   type : "text",
  //   text : "validation error\nmm/ddもしくはmm月dd日の形で送信してね！",
  // }
};
