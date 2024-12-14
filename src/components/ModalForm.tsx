import { TodoForm, Todo } from "../types";
import { MONTHS, getMonth, getDay } from "../utils";
import { SyntheticEvent, useState, useEffect } from "react";

interface ModalFormProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTodoData: React.Dispatch<React.SetStateAction<Todo | null>>;
  createTodo: (formData: TodoForm, e: SyntheticEvent) => void;
  editTodo: (id: number, formData: TodoForm, e: SyntheticEvent) => void;
  todoData: Todo | null;
  handleCheck: (
    e: React.MouseEvent<HTMLButtonElement>,
    todoId?: number | null
  ) => void;
}

const ModalForm = ({
  setModalOpen,
  setTodoData,
  createTodo,
  editTodo,
  todoData,
  handleCheck,
}: ModalFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    day: "",
    month: "",
    year: "",
    description: "",
  });
  const [editState, setEditState] = useState(false);
  const [todoId, setTodoId] = useState<number | null>(null);

  useEffect(() => {
    if (todoData) {
      const newObj = {
        title: todoData.title || "",
        day: getDay(todoData.day) || "",
        month: getMonth(todoData.month) || "",
        year: todoData.year || "",
        description: todoData.description || "",
      };

      setTodoId(todoData.id);
      setEditState(true);
      setFormData(newObj);
    }
  }, [todoData]);

  return (
    <>
      <div
        className="modal"
        id="modal_layer"
        onClick={() => {
          setModalOpen(false);
          setTodoData(null);
        }}
      ></div>
      <div className="modal" id="form_modal">
        <form action="" method="post">
          <fieldset>
            <ul>
              <li>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder={formData.title || "Item 1"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.currentTarget.value;
                    setFormData((prev) => ({
                      ...prev,
                      title: value,
                    }));
                  }}
                />
              </li>
              <li>
                <label htmlFor="due">Due Date</label>
                <div className="date">
                  <select
                    id="due_day"
                    name="due_day"
                    value={formData.day || "Day"}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const value = e.currentTarget.value;
                      setFormData((prev) => ({
                        ...prev,
                        day: value,
                      }));
                    }}
                  >
                    <option>Day</option>
                    {[...Array(31).keys()].map((key) => {
                      return (
                        <option key={key + 1} value={String(key + 1)}>
                          {key + 1}
                        </option>
                      );
                    })}
                  </select>{" "}
                  /
                  <select
                    id="due_month"
                    name="due_month"
                    value={formData.month || "Month"}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const value = e.currentTarget.value;
                      setFormData((prev) => ({
                        ...prev,
                        month: value,
                      }));
                    }}
                  >
                    <option>Month</option>
                    {MONTHS.map((month) => {
                      return (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      );
                    })}
                  </select>{" "}
                  /
                  <select
                    id="due_year"
                    name="due_year"
                    value={formData.year || "Year"}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const value = e.currentTarget.value;
                      setFormData((prev) => ({
                        ...prev,
                        year: value,
                      }));
                    }}
                  >
                    <option>Year</option>
                    {[...Array(13).keys()].map((key) => {
                      return (
                        <option key={2013 + key} value={String(2013 + key)}>
                          {2013 + key}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  cols={50}
                  name="description"
                  rows={7}
                  placeholder={formData.description || "Description"}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const value = e.currentTarget.value;
                    setFormData((prev) => ({
                      ...prev,
                      description: value,
                    }));
                  }}
                ></textarea>
              </li>
              <li>
                <input
                  type="submit"
                  value="Save"
                  disabled={formData.title.length < 3}
                  onClick={(e: SyntheticEvent) => {
                    if (editState) {
                      editTodo(todoId as number, formData, e);
                    } else {
                      createTodo(formData, e);
                    }
                    setTodoId(null);
                    setEditState(false);
                    setModalOpen(false);
                  }}
                />
                <button
                  name="complete"
                  disabled={todoData?.completed || false}
                  onClick={(e) => {
                    handleCheck(e, todoId);
                    setTodoId(null);
                    setEditState(false);
                    setModalOpen(false);
                  }}
                >
                  Mark As Complete
                </button>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default ModalForm;
