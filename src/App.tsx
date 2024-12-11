import { useState, useEffect } from "react";
import { getAllTodos } from "./services/todoService";
import { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getAllTodos().then((res) => {
      setTodos(res);
    });
  }, []);

  return (
    <>
      <div>
        <ul>
          {todos.map((todo: Todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
