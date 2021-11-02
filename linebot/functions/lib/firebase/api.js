const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();


module.exports.addTodo = async(task, due, uid) => {
  await db.collection("todos").add({
    todoName: task,
    deadLine: due,
    userId: uid, 
    // isComplete: false,
  })
}

module.exports.deleteTodo = async (id) => {
  await db.collection("todos").doc(id).delete();
}


module.exports.getId = async (id) => {
  const todo = await db.collection("todos").doc(id)
  return todo.get().then((doc) => {
    return doc.data().userId;
  });
}

module.exports.getTodo = async (uid) => {
  const todo = await db.collection("todos")
  .orderBy("deadLine")
  .where("userId", "==", uid); //uidが一致するもの指定

  return todo.get().then((snapshot) => {
    let todos = [];
    snapshot.forEach((doc)=>{ 
      todos.push({
        id: doc.id,
        todoName: doc.data().name,
        notice: doc.data().notice,
        deadLine: doc.data().deadLine, 
        // isComplete: doc.data().isComplete,
      });
    });
    return todos;
  });
}

//データ整形
exports.join = (datas) => {
  let data = [];
  let len = (datas.length > 5) ? 5 : datas.length;
  for(var i = 0; i < len ; i++){
    data.push(
      {
        "type": "template",
        "altText": datas[i].todoName,
        "template": {
            "type": "buttons",
            "actions": [
                {//ポストバックでtodoの情報を返す
                    "type": "postback",
                    "label": "完了",
                    "data" : JSON.stringify(datas[i]), //文字列
                },
            ],
        "title" : datas[i].todoName,
        "text" : "期日 : " + datas[i].deadLine,
        }
      },
    )
  }
  return data;
}

module.exports.remindTodo = async (now) => {
  const todo = await db.collection("todos")
  .where("notice", "==", now); //uidが一致するもの指定
  return todo.get().then((snapshot) => {
    let todos = [];
    snapshot.forEach((doc)=>{ 
      todos.push({
        id: doc.id,
        userId: doc.data().userId,
        todoName: doc.data().name,
        notice: doc.data().notice,
        deadLine: doc.data().deadLine, 
      });
    });
    return todos;
  });
}