import React, { useState,useCallback } from "react";
//FB
import { db } from "../firebase";
import { setDoc, onSnapshot, doc } from "firebase/firestore";
//type
import { list } from "../Types/ListType";

export const useEditList = () => {
  const [shoppingList, setShoppingList] = useState<list[]>();

  const handleOnRemove = useCallback(
    async (id: number) => {
      // const deepCopy = data?.map((list) => ({ ...list }));
      let listArray: list[] = [];
      shoppingList?.forEach((list) => {
        if (list.id !== id) {
          listArray.push(list);
        }
      });
      setShoppingList(listArray);
      console.log(listArray);

      await setDoc(doc(db, "shopping", "list"), {
        shoppingList: listArray,
      });
    },
    [shoppingList]
  );

  const handleOnCheck = useCallback(
    async (id: number, checked: boolean) => {
      let newlists: list[] = [];
      newlists = shoppingList!.map((list) => {
        if (list.id === id) {
          list.checked = !checked;
        }
        return list;
      });
      setShoppingList(newlists);
      await setDoc(doc(db, "shopping", "list"), {
        shoppingList: shoppingList,
      });
    },
    [shoppingList]
  );
  return { shoppingList, setShoppingList, handleOnRemove, handleOnCheck };
};
