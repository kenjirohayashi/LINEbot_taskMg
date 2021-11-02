import "firebase/compat/firestore";
import {db} from "./firebase"

// Add a new document with a generated id.
export const addTodo = (name, due, notice, uid) =>{
    db.collection("todos").add({
      name:name,
      deadLine: due,
      notice: notice,
      userId:uid,
    });
}
