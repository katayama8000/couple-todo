import { useState } from 'react'

type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

export const useInput = () => {
  const [tmpTodo, setTmpTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpTodo(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!tmpTodo) return;

    const newTodo: Todo = {
      value: tmpTodo,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos([...todos, newTodo]);
    setTmpTodo("");
  };

  return { tmpTodo, todos, setTodos, handleOnChange, handleOnSubmit };
};
