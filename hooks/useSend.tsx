import { useEffect, useState } from 'react'
//FB
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  query,
  getDocs,
  updateDoc,
  setDoc,
} from "firebase/firestore";
//type
import { list } from "../Types/ListType";

export const useSend = () => {
  const [tmplist, setTmpList] = useState<string>("");
  const [lists, setLists] = useState<list[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpList(e.target.value);
  };

  const handleOnSubmit = async() => {
    if (!tmplist) return;

    const newList: list = {
      value: tmplist,
      id: new Date().getTime(),
      checked: false,
    };

    const oldList:list[] = [...lists]

    setLists([...oldList, newList]);
    setTmpList("");
  };

  useEffect(() => {
    const handleOnsend = async () => {
      await setDoc(doc(db, "shopping", "list"), {
        shoppingList: lists,
      });
    };
    if (lists.length !== 0) {
      handleOnsend();
    }
  },[lists])

  return { tmplist, lists, setLists, handleOnChange, handleOnSubmit };
};
