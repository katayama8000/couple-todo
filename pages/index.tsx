import type { NextPage } from "next";
import { useState } from "react";

import { ChangeThemeButton } from "../components/ChangeThemeButton";
import { DoneModal } from "../components/DoneModal";
import { useInput } from "../hooks/useInput";


type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};


const Home: NextPage = () => {
  // const [tmpTodo, setTmpTodo] = useState<string>("");
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [done,setDone] = useState(false)
  const { tmpTodo, todos,setTodos, handleOnChange, handleOnSubmit } = useInput();

  // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTmpTodo(e.target.value);
  // };

  // const handleOnSubmit = () => {
  //   if (!tmpTodo) return;

  //   const newTodo: Todo = {
  //     value: tmpTodo,
  //     id: new Date().getTime(),
  //     checked: false,
  //     removed: false,
  //   };

  //   setTodos([...todos, newTodo]);
  //   setTmpTodo("");
  // };

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
    <div className="mx-5 pb-24">
      <h1 className="my-3 p-5 text-center text-3xl text-white bg-indigo-400 font-bold rounded">
        夫婦の買い物
      </h1>
      {done ? (
        <DoneModal
          onClick={() => {
            setDone(false);
          }}
        />
      ) : null}
      <ChangeThemeButton />
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
          className="bg-indigo-400"
        />
        <input type="submit" value="追加" onSubmit={handleOnSubmit} />
      </form>
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
      <div className="fixed bottom-0 inset-x-0 p-4 text-center text-white text-3xl bg-gray-700">
        <button
          onClick={() => {
            setDone(true);
          }}
          className="block m-auto px-4 py-2 w-11/12 text-white text-xl font-semibold bg-indigo-400 rounded shadow"
        >
          買い物終了
        </button>
      </div>
    </div>
  );
};

export default Home;
