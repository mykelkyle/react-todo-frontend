import { Todo, TodoForm } from "../types";
const BASE_URL = "http://localhost:5173/api";

export async function getAllTodos() {
  try {
    const response = await fetch(BASE_URL + "/todos");
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong fetching todos.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}

export async function updateTodo(id: number, todo: Partial<Todo>) {
  try {
    const response = await fetch(BASE_URL + `/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (response.status !== 200) {
      throw new Error("Something went wrong updating a todo.");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}

export async function postTodo(todoData: TodoForm) {
  try {
    const response = await fetch(BASE_URL + `/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });
    if (response.status !== 201) {
      throw new Error("Something went wrong creating a todo.");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}

export async function deleteTodo(id: number) {
  try {
    const response = await fetch(BASE_URL + `/todos/${id}`, {
      method: "DELETE",
    });

    if (response.status !== 204) {
      throw new Error("Something went wrong deleting a todo.");
    }

    return true; // meaningful response
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}
