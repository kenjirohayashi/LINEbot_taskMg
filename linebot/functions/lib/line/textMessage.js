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
    text : "使い方\n・登録\n\メニューから登録できます!\n一覧表示\n\"@show\"と送信してください!\n\nリッチメニューから簡単に操作できます！！",
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