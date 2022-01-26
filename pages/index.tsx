import type { NextPage } from "next";
import { useEffect, useState,useCallback } from "react";

//components
import { ChangeThemeButton } from "../components/ChangeThemeButton";
import { DoneModal } from "../components/DoneModal";
import { ConfirmModal } from "../components/ConfirmModal";
import { useSend } from "../hooks/useSend";
import { useEditList } from "../hooks/useEditList";
//FB
import { db } from "../firebase";
import { setDoc, onSnapshot, doc } from "firebase/firestore";
//type
import { list } from "../Types/ListType";
//global
import { proxy, useSnapshot } from "valtio";

export const flagState = proxy({ comfirmFlag: false, doneFlag: false });

const Home: NextPage = () => {
  const flag = useSnapshot(flagState);
  const { tmplist, lists, setLists, handleOnChange, handleOnSubmit } =
    useSend();
  const { shoppingList, setShoppingList, handleOnRemove, handleOnCheck } =
    useEditList();

  //DBをクリアしてしまうのでとりあえずなし
  // useEffect(() => {
  //   const send = async () => {
  //     await setDoc(doc(db, "shopping", "list"), {
  //       shoppingList: lists,
  //     });
  //   };
  //   send();
  // }, [lists]);

  useEffect(() => {
    onSnapshot(doc(db, "shopping", "list"), (doc) => {
      let dataFromDB = doc.data();
      setShoppingList(dataFromDB?.shoppingList);
    });
  }, [setShoppingList]);

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

  const shoppingIsOver = useCallback(async () => {
    console.log("shoppingIsOver");
    let i: number = 0;
    shoppingList?.forEach((list) => {
      if (list.checked === false) {
        console.log("false");
        flagState.comfirmFlag = true;
      } else {
        i++;
      }
    });

    if (shoppingList?.length === 0) {
      alert("何も買ってないよ");
    } else if (shoppingList?.length === i) {
      flagState.doneFlag = true;
    }
  }, [shoppingList]);

  return (
    <div className="mx-5 pb-24">
      <h1 className="my-3 p-5 text-center text-3xl text-white bg-indigo-400 font-bold rounded">
        夫婦の買い物
      </h1>
      {flag.doneFlag ? <DoneModal /> : null}
      {flag.comfirmFlag ? <ConfirmModal /> : null}

      <ChangeThemeButton />

      <button
        onClick={() => {
          console.log(shoppingList);
        }}
      >
        console
      </button>
      <div className="m-auto block p-5 justify-center w-max">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit();
          }}
          className="m-auto"
        >
          <input
            type="text"
            value={tmplist}
            onChange={(e) => handleOnChange(e)}
            className="bg-indigo-400"
          />
          <input type="submit" value="追加" onSubmit={handleOnSubmit} />
        </form>
      </div>
      <ul>
        {lists.map((list) => {
          return <li key={list.id}></li>;
        })}
      </ul>
      <hr></hr>
      <ul>
        {shoppingList?.map((list: list) => {
          return (
            <li key={list.id} className="py-2">
              <input
                type="checkbox"
                checked={list.checked}
                onChange={() => handleOnCheck(list.id, list.checked)}
              />
              <button disabled={list.checked}>{list.value}</button>
              <button
                onClick={() => handleOnRemove(list.id)}
                className="px-2 py-1 text-green-500 border border-green-500 font-semibold rounded hover:bg-green-100"
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>
      <div className="fixed bottom-0 inset-x-0 p-4 text-center text-white text-3xl bg-gray-700">
        <button
          onClick={() => {
            shoppingIsOver();
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
