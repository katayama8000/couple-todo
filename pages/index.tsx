import type { NextPage } from "next";
import { useState } from "react";

import styles from "../styles/Home.module.css";

type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

const useInput = () => {
  //  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //    setTmpTodo(e.target.value);
  //  };
  // return { handleOnChange };
}

const Home: NextPage = () => {
  const [tmpTodo, setTmpTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  //const { handleOnChange } = useInput();

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

  const handleOnEdit = (id: number, value: string) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    // ディープコピーされた配列に Array.map() を適用
    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <div className={styles.container}>
      <h1 className="p-5 text-center text-3xl text-white bg-red-500 font-bold ">
        夫婦の買い物
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
        className="my-5"
      >
        <input
          type="text"
          value={tmpTodo}
          onChange={(e) => handleOnChange(e)}
          className="bg-red-500 border-gray-900"
        />
        <input type="submit" value="追加" onSubmit={handleOnSubmit} />
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => handleOnCheck(todo.id, todo.checked)}
                />
                <input
                  type="text"
                  disabled={todo.checked}
                  value={todo.value}
                  onChange={(e) => handleOnEdit(todo.id, e.target.value)}
                />
                <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                  {todo.removed ? "復元" : "削除"}
                </button>
              </li>
            );
          })}
        </ul>
      </form>
    </div>
  );
};

export default Home;
