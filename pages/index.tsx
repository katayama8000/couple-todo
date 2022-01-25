import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { ChangeThemeButton } from "../components/ChangeThemeButton";
import { DoneModal } from "../components/DoneModal";
import { OverModal } from "../components/OverModal";
import { useSend } from "../hooks/useSend";
import { db } from "../firebase";
import {
  setDoc,
  collection,
  onSnapshot,
  doc,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";

type list = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

const Home: NextPage = () => {
  const [done, setDone] = useState(false);
  const [overM, setOverM] = useState(false);
  const [data, setData] = useState<list[]>();

  const { tmplist, lists, setLists, handleOnChange, handleOnSubmit } =
    useSend();

  //DBをクリアしてしまうのでとりあえずなし
  // useEffect(() => {
  //   const send = async () => {
  //     await setDoc(doc(db, "shopping", "List"), {
  //       shoppingList: lists,
  //     });
  //   };
  //   send();
  // }, [lists]);

  useEffect(() => {
      onSnapshot(doc(db, "shopping", "List"), (doc) => {
      let tmp = doc.data();
      setData(tmp?.shoppingList);
    });
  }, []);

  const handleOnEdit = (id: number, value: string) => {
    const deepCopy = lists.map((list) => ({ ...list }));
    // ディープコピーされた配列に Array.map() を適用
    const newlists = deepCopy.map((list) => {
      if (list.id === id) {
        list.value = value;
      }
      return list;
    });
    setLists(newlists);
  };

  const handleOnCheck = async(id: number, checked: boolean) => {
    const deepCopy = lists.map((list) => ({ ...list }));

    const newlists = deepCopy.map((list) => {
      if (list.id === id) {
        list.checked = !checked;
      }
      return list;
    });
    setLists(newlists);
    
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = lists.map((list) => ({ ...list }));
    const newlists = deepCopy.map((list) => {
      if (list.id === id) {
        list.removed = !removed;
      }
      return list;
    });
    setLists(newlists);
  };

  const remove = async(id: number) => {
    // const deepCopy = data?.map((list) => ({ ...list }));
    let array:any[] = []
    data?.forEach((list) => {
      if (list.id !== id) {
        array.push(list)
      }
    });
    setData(array)

    await setDoc(doc(db, "shopping", "List"), {
      shoppingList: data,
    });
  }

  const check = async (id: number, checked: boolean) => {
    let newlists:list[] = []
    newlists = data!.map((list) => {
      if (list.id === id) {
        list.checked = !checked;
      }
      return list
    });
    setData(newlists);

    await setDoc(doc(db, "shopping", "List"), {
      shoppingList: data,
    });
  };

  const over = async () => {
    let i:number = 0
    data?.forEach((list) => {
      if (list.checked === false) {
        setOverM(true)
      } else {
        i++
      }
    });

    if (data!.length === i) {
      setDone(true)
    }
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
      {overM ? (
        <OverModal
          onClick={() => {
            setOverM(false);
          }}
        />
      ) : null}

      <ChangeThemeButton />
      <button
        onClick={() => {
          console.log(lists);
        }}
      >
        console
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
        className="my-5"
      >
        <input
          type="text"
          value={tmplist}
          onChange={(e) => handleOnChange(e)}
          className="bg-indigo-400"
        />
        <input type="submit" value="追加" onSubmit={handleOnSubmit} />
      </form>
      <ul>
        {lists.map((list) => {
          return (
            <li key={list.id}>
              <input
                type="checkbox"
                checked={list.checked}
                onChange={() => handleOnCheck(list.id, list.checked)}
              />
              <input
                type="text"
                disabled={list.checked}
                value={list.value}
                onChange={(e) => handleOnEdit(list.id, e.target.value)}
              />
              <button onClick={() => handleOnRemove(list.id, list.removed)}>
                {list.removed ? "復元" : "削除"}
              </button>
            </li>
          );
        })}
      </ul>
      <hr></hr>
      <h1
        onClick={() => {
          over()
        }}
      >
        終了
      </h1>
      <ul>
        {data?.map((list: list) => {
          return (
            <li key={list.id}>
              <input
                type="checkbox"
                checked={list.checked}
                onChange={() => check(list.id, list.checked)}
              />
              <input
                type="text"
                disabled={list.checked}
                value={list.value}
                onChange={(e) => handleOnEdit(list.id, e.target.value)}
              />
              <button onClick={() => remove(list.id)}>
                {list.removed ? "復元" : "削除"}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="fixed bottom-0 inset-x-0 p-4 text-center text-white text-3xl bg-gray-700">
        <button
          onClick={() => {
            //setDone(true);
            over()
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
