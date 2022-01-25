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
              "label": "一覧表示",
              "text": "@show"
            }
        ]
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
      text : "[使い方]\n・登録\n\メニューから登録できます!\n・一覧表示\n\"@show\"と送信してください!\n・タスクの完了\n一覧表示から完了ボタンを押してください!\n\nリッチメニューから簡単に操作できます！！",
   },
};