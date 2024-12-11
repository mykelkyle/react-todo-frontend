const BASE_URL = "http://localhost:5173/api";

export async function getAllTodos() {
  try {
    const response = await fetch(BASE_URL + "/todos");
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong fetching todos");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}
