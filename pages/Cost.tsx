import { useEffect, useState } from "react";
//FB
import { db } from "../firebase";
import { setDoc, onSnapshot, doc } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";

const Cost = () => {
  const [monthCost, setMonthCost] = useState(0)
  
  useEffect(() => {
    let today = new Date();
    let thisMonth = today.getMonth() + 1
    const q = query(collection(db, "totalcost"));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().month === thisMonth) {
          setMonthCost((monthCost) => monthCost + doc.data().cost);
        }
      });
    });
  }, []);

  return (
    <div className="mx-5 pb-24">
      <h1 className="my-3 p-5 text-center text-3xl text-white bg-indigo-400 font-bold rounded">
        今月の出費
      </h1>
      <div>{ monthCost }</div>
    </div>
  );
};

export default Cost;
