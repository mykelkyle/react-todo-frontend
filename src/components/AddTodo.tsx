import { SyntheticEvent } from "react";

interface AddTodoProps {
  openModal: (event: SyntheticEvent) => void;
}

const AddTodo = ({ openModal }: AddTodoProps) => {
  return (
    <label htmlFor="new_item" onClick={openModal}>
      <img src="/images/plus.png" alt="Add Todo Item" />
      <h2>Add new to do</h2>
    </label>
  );
};

export default AddTodo;
