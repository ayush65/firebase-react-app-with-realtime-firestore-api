import { database, db } from "../../config/firebase";
import { uid } from "uid";
import {
  set,
  ref,
  onValue,
  remove,
  update,
  getDatabase,
  child,
  get,
  push,
} from "firebase/database";
import { useState, useEffect } from "react";

function FirebaseRealtime() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      setTodos([]);
      const data = snapshot.val().Maintodo;
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);

  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(database, `/Maintodo/${uuid}`), {
      todo,
      uuid,
      update: 0,
    });

    setTodo("");
  };

  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempUuid(todo.uuid);
    setTodo(todo.todo);
  };

  const handleSubmitChange = () => {
    const foundTodoIndex = todos.findIndex((item) => item.todo === todo);
    if (foundTodoIndex !== -1) {
      todos[foundTodoIndex].update = Number(todos[foundTodoIndex].update) + 1;
      //   console.log(todos[foundTodoIndex]);
      //   console.log(todos);
      update(ref(database, `/Maintodo/${tempUuid}`), {
        todo,
        uuid: tempUuid,
        update: todos[foundTodoIndex].update,
      });
    } else {
      update(ref(database, `/Maintodo/${tempUuid}`), {
        todo,
        uuid: tempUuid,
      });
    }

    console.log(todo);

    setTodo("");
    setIsEdit(false);
  };

  const handleDelete = (todo) => {
    remove(ref(database, `/Maintodo/${todo.uuid}`));
  };

  const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const dataRef = ref(database, "/Maintodo");

//     onValue(dataRef, (snapshot) => {
//       const updatedData = snapshot.val();
//       console.log(updatedData);
//       // Access the updated data in your React component
//       // Perform any necessary actions or updates based on the updated data
//     });

//   }, []);

  return (
    <div className="user-content-container">
      <div className="user-content-div">
        <input
          type="text"
          value={todo}
          onChange={handleTodoChange}
          placeholder="todo data string..."
        />
        {isEdit ? (
          <>
            <button onClick={handleSubmitChange}>Submit Change</button>
            <button
              onClick={() => {
                setIsEdit(false);
                setTodo("");
              }}
            >
              X
            </button>
          </>
        ) : (
          <button onClick={writeToDatabase}>submit</button>
        )}
      </div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h1>{todo.todo}</h1>
          <button onClick={() => handleUpdate(todo)}>update</button>
          <button onClick={() => handleDelete(todo)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default FirebaseRealtime;
