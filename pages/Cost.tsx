import { useEffect, useState } from "react";
//FB
import { db } from "../firebase";
import { setDoc, onSnapshot, doc } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";

const Cost = () => {
  const [monthCost, setMonthCost] = useState(0);
  const [lastMonthCost, setLastMonthCost] = useState(0);
  const [monthBeforeLastCost, setMonthBeforeLastCost] = useState(0);

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    if (isMounted) {
      let today = new Date();
      let thisMonth = today.getMonth() + 1;
      let lastMonth = thisMonth - 1;
      let monthBeforeLast = thisMonth - 2;
      const q = query(collection(db, "totalcost"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          switch (doc.data().month) {
            case thisMonth:
              setMonthCost((monthCost) => monthCost + doc.data().cost);
              break;
            case lastMonth:
              setLastMonthCost((monthCost) => monthCost + doc.data().cost);
              break;
            case monthBeforeLast:
              setMonthBeforeLastCost(
                (monthCost) => monthCost + doc.data().cost
              );
              break;
            default:
              console.log("その他");
          }
        });
      });
      return () => {
        isMounted = false;
      };
    }
  }, []);

  return (
    <div className="mx-5 pb-24">
      <h1 className="my-3 p-2 text-center text-2xl text-white bg-indigo-400 font-bold rounded">
        今月の出費
      </h1>
      <div>{monthCost}</div>
      <h1 className="my-3 p-2 text-center text-2xl text-white bg-indigo-400 font-bold rounded">
        先月の出費
      </h1>
      <div>{lastMonthCost}</div>
      <h1 className="my-3 p-2 text-center text-2xl text-white bg-indigo-400 font-bold rounded">
        先先月の出費
      </h1>
      <div>{monthBeforeLastCost}</div>
      <h1 className="my-3 p-2 text-center text-2xl text-white bg-indigo-400 font-bold rounded">
        今年の出費
      </h1>
      <div>{monthCost + lastMonthCost + monthBeforeLastCost}</div>
    </div>
  );
};

export default Cost;
