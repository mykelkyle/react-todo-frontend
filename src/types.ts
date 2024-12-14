export interface Todo {
  id: number;
  title: string;
  day?: string;
  month?: string;
  year?: string;
  completed: boolean;
  description?: string;
}

export interface TodoForm {
  title: string;
  day?: string;
  month?: string;
  year?: string;
  description?: string;
}

export type EditTodoForm = TodoForm & {
  id: number;
};
