import { Todo, TodoForm } from "./types";

const OUT_OF_BOUNDS = Infinity;

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatTodoDayAndMonth(todoData: TodoForm) {
  if (todoData.day && todoData.day.length < 2) {
    todoData.day = `0${todoData.day}`;
  }
  if (todoData.month) {
    const month = String(MONTHS.indexOf(todoData.month) + 1);
    if (month.length < 2) {
      todoData.month = `0${month}`;
    } else {
      todoData.month = month;
    }
  }
  return todoData;
}

export function orderTodos(todoList: Todo[]): Todo[] {
  const incompleteTodos = todoList
    .filter((todo) => !todo.completed)
    .sort(compareByTodoDate);

  const completedTodos = todoList
    .filter((todo) => todo.completed)
    .sort(compareByTodoDate);

  return incompleteTodos.concat(completedTodos);
}

export function getDate(todo: Todo) {
  const noDueDate = todo.month === "" || todo.year === "";
  return noDueDate ? "No Due Date" : `${todo.month}/${todo.year}`;
}

export function getMonth(index: unknown) {
  if (typeof index === "string") {
    return MONTHS[Number(index) - 1];
  }
  return null;
}

export function getDay(day: unknown) {
  if (typeof day === "string") {
    return day.replace(/^0+/g, "");
  }
  return null;
}

export function getTodo(todoList: Todo[], id: number) {
  return todoList.find((todo) => todo.id === id);
}

export const compareByTodoDate = (a: Todo, b: Todo) => {
  const aMonth = (a.month && parseInt(a.month, 10)) || OUT_OF_BOUNDS;
  const aYear = (a.year && parseInt(a.year, 10)) || OUT_OF_BOUNDS;
  const bMonth = (b.month && parseInt(b.month, 10)) || OUT_OF_BOUNDS;
  const bYear = (b.year && parseInt(b.year, 10)) || OUT_OF_BOUNDS;

  if (aYear === bYear && aMonth === bMonth) {
    return 0;
  }

  if (aYear === bYear) {
    return aMonth > bMonth ? 1 : -1;
  }

  return aYear > bYear ? 1 : -1;
};
