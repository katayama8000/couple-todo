import { useEffect, useState, useRef } from "react";
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
  const renderFlgRef = useRef(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpList(e.target.value);
    console.log(e.target.value);
  };

  const handleOnSubmit = async () => {
    if (!tmplist) return;
    
    const newList: list = {
      value: tmplist,
      id: new Date().getTime(),
      checked: false,
    };
    
    console.log(newList);
    console.log(lists);
    //const oldList: list[] = [...lists];

    setLists([...lists!, newList]);
    setTmpList("");
  };

  useEffect(() => {
    if (renderFlgRef.current) {
      const handleOnsend = async () => {
        await setDoc(doc(db, "shopping", "list"), {
          shoppingList: lists,
        });
      };

      console.log(lists)
      if (lists.length !== 0) {
        handleOnsend();
      }
    } else {
      renderFlgRef.current = true;
    }
  }, [lists]);

  return { tmplist, lists, setLists, handleOnChange, handleOnSubmit };
};
