import type { NextPage } from "next";
import { useEffect, useState, useCallback, useRef } from "react";
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
  //const { tmplist, shoppingList, setShoppingList, handleOnChange, handleOnSubmit } =useSend();
  const [tmplist, setTmpList] = useState<string>("");
  const renderFlgRef = useRef(false);
  const { shoppingList, setShoppingList, handleOnRemove, handleOnCheck } = useEditList();

  //---------------------------------------------------------------------
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setTmpList(e.target.value);
  };

  const handleOnSubmit = async () => {
    if (!tmplist) return;

    const newList: list = {
      value: tmplist,
      id: new Date().getTime(),
      checked: false,
    };
    setShoppingList([newList, ...shoppingList!]);
    setTmpList("");
  };

  useEffect(() => {
    if (renderFlgRef.current) {
      console.log("初回");
      let unmounted = false;

      const handleOnsend = async () => {
        if (!unmounted) {
          try {
            await setDoc(doc(db, "shopping", "list"), {
              shoppingList: shoppingList,
            });
          } catch (e) {
            console.log("FBerror");
          }
        }
      };
      if (shoppingList?.length! !== 0) {
        console.log("実行");
        handleOnsend();
      }
      return () => {
        unmounted = true;
      };
    } else {
      renderFlgRef.current = true;
    }
  }, [shoppingList]);
  //---------------------------------------------------------------------

  useEffect(() => {
    //FBの変更を検知して、stateに代入
    onSnapshot(doc(db, "shopping", "list"), (doc) => {
      let dataFromDB = doc.data();
      //shoppingListの状態を配列として保つ必要がある
      console.log(dataFromDB);
      console.log(typeof(dataFromDB));
      dataFromDB !== undefined
        ? setShoppingList(dataFromDB?.shoppingList)
        : setShoppingList([]);
      console.log(shoppingList);
    });
  }, [setShoppingList]);

  // const handleOnEdit = (id: number, value: string) => {
  //   const deepCopy = lists.map((list) => ({ ...list }));
  //   // ディープコピーされた配列に Array.map() を適用
  //   const newlists = deepCopy.map((list) => {
  //     if (list.id === id) {
  //       list.value = value;
  //     }
  //     return list;
  //   });
  //   setLists(newlists);
  // };

  const shoppingIsOver = useCallback(async () => {
    console.log("shoppingIsOver");
    let i: number = 0;
    shoppingList?.forEach((list) => {
      if (list.checked === false) {
        flagState.comfirmFlag = true;
      } else {
        i++;
      }
    });

    if (shoppingList?.length === 0) {
      //何も買ってないよ
    } else if (shoppingList?.length === i) {
      flagState.doneFlag = true;
    }
  }, [shoppingList]);

  return (
    <div className="mx-5 pb-24">
      <h1 className="my-3 p-5 text-center text-3xl text-white bg-indigo-400 font-bold rounded">
        夫婦の買い物
      </h1>
      <button onClick={() => console.log(shoppingList)}>button</button>
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
      {/* <ul>
        {lists.map((list) => {
          return <li key={list.id}></li>;
        })}
      </ul> */}
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
