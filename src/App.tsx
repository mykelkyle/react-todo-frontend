import { useState, useEffect, SyntheticEvent } from "react";
import { getAllTodos, postTodo, updateTodo } from "./services/todoService";
import { Todo, TodoForm } from "./types";
import { formatTodoDayAndMonth, orderTodos, getTodo } from "./utils";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import ModalForm from "./components/ModalForm";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [todoData, setTodoData] = useState<Todo | null>(null);

  useEffect(() => {
    getAllTodos().then((res) => {
      const orderedTodos = orderTodos(res);
      setTodos(orderedTodos);
    });
  }, []);

  const openModal = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    const attr = target.getAttribute("for");

    if (attr == null) {
      console.log("target does not have correct attribute");
      return;
    }

    if (attr === "new_item") {
      setModalOpen(true);
    } else if (attr.startsWith("item")) {
      const id = Number(attr.replace("item_", ""));
      const todo = getTodo(todos, id);
      if (todo) {
        setModalOpen(true);
        setTodoData(todo);
      } else {
        console.log("Specified todo could not be found.");
      }
    }
  };

  const handleCheck = async (
    e:
      | React.MouseEvent<HTMLTableCellElement>
      | React.MouseEvent<HTMLButtonElement>,
    id?: number | null
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const target = e.currentTarget;

    let checkbox;
    let completed;

    console.log(target.firstElementChild);

    if (target.firstElementChild) {
      checkbox = target.firstElementChild as HTMLInputElement;
      id = Number(checkbox.id.replace("item_", ""));
      completed = !checkbox.checked;
    } else if (id) {
      const todo = getTodo(todos, id as number);
      completed = !todo?.completed;
    }

    if (id && completed !== null) {
      const newTodo = await updateTodo(id, { completed });
      if (newTodo) {
        setTodos((prevTodos) => {
          const newTodos = prevTodos.map((todo) => {
            return todo.id === id ? { ...newTodo } : todo;
          });
          return orderTodos(newTodos);
        });
      }
    } else {
      console.log("error checking todo item");
    }
  };

  const createTodo = async (todoData: TodoForm, e: SyntheticEvent) => {
    e.preventDefault();
    todoData = formatTodoDayAndMonth(todoData);

    const newTodo = await postTodo(todoData);
    if (newTodo) {
      setTodos((prevTodos) => {
        const newTodoList = prevTodos.concat(newTodo);
        const orderedList = orderTodos(newTodoList);
        return orderedList;
      });
    } else {
      console.log(
        "New todo is undefined, possibly invalid fields (title, description)"
      );
    }
  };

  const editTodo = async (
    id: number,
    todoData: TodoForm,
    e: SyntheticEvent
  ) => {
    e.preventDefault();

    todoData = formatTodoDayAndMonth(todoData);
    const editedTodo = await updateTodo(id, todoData);
    if (editedTodo) {
      setTodos((prevTodos) => {
        const newTodos = prevTodos.map((todo) => {
          return todo.id === id ? { ...editedTodo } : todo;
        });
        return orderTodos(newTodos);
      });
    }
  };

  return (
    <div id="items">
      <Header title="All Todos" numOfTodos={todos.length} />
      <main>
        <AddTodo openModal={openModal} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          handleCheck={handleCheck}
          openModal={openModal}
        />
        {modalOpen && (
          <ModalForm
            setModalOpen={setModalOpen}
            setTodoData={setTodoData}
            createTodo={createTodo}
            editTodo={editTodo}
            todoData={todoData}
            handleCheck={handleCheck}
          />
        )}
      </main>
    </div>
  );
}

export default App;
