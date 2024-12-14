import { SyntheticEvent } from "react";
import { deleteTodo } from "../services/todoService";
import { Todo } from "../types";
import { getDate } from "../utils";

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  openModal: (e: SyntheticEvent) => void;
  handleCheck: (e: React.MouseEvent<HTMLTableCellElement>) => Promise<void>;
}

const TodoList = ({
  todos,
  setTodos,
  handleCheck,
  openModal,
}: TodoListProps) => {
  const handleDelete = async (e: SyntheticEvent) => {
    const target = e.currentTarget;
    let id: number;

    if (target.parentElement) {
      id = Number(target.parentElement.dataset.id);
      const response = await deleteTodo(id);
      if (!response) {
        console.log("unexpected response from backend");
      } else {
        setTodos((prevTodos) => {
          return prevTodos.filter((todo) => {
            return todo.id !== id;
          });
        });
      }
    } else {
      console.log("error with todo item id or undefined element");
    }
  };

  return (
    <table>
      <tbody>
        {todos.map((todo: Todo) => {
          return (
            <tr key={todo.id} data-id={todo.id}>
              <td className="list_item" onClick={handleCheck}>
                <input
                  type="checkbox"
                  name={`item_${todo.id}`}
                  id={`item_${todo.id}`}
                  checked={todo.completed}
                  onChange={() => {}}
                />
                <span className="check"></span>
                <label
                  htmlFor={`item_${todo.id}`}
                  onClick={(e) => {
                    openModal(e);
                  }}
                >
                  {todo.title} - {getDate(todo)}
                </label>
              </td>
              <td className="delete" onClick={handleDelete}>
                <img src="images/trash.png" alt="Delete" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TodoList;
