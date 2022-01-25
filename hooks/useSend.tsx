import { useState } from 'react'


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

type list = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

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
      removed: false,
    };

    console.log(lists);
    setLists([...lists,newList]);
    setTmpList("");
  };


  return { tmplist, lists, setLists, handleOnChange, handleOnSubmit };
};
