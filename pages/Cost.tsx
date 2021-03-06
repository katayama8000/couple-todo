import { useEffect, useState } from "react";
//FB
import { db } from "../firebase";
import { setDoc, onSnapshot, doc } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";

const Cost = () => {
  const [monthCost, setMonthCost] = useState(0);
  const [lastMonthCost, setLastMonthCost] = useState(0);
  const [monthBeforeLastCost, setMonthBeforeLastCost] = useState(0);
  const [yearCost, setYeatCost] = useState(0);

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    if (isMounted) {
      let today = new Date();
      let thisYear = today.getFullYear();
      let lastYear = today.getFullYear() - 1;
      let thisMonth = today.getMonth() + 1;
      let lastMonth = today.getMonth() + 1 === 1 ? 12 : today.getMonth();
      console.log(lastMonth);
      let monthBeforeLast =
        today.getMonth() + 1 === 2
          ? 12
          : today.getMonth() + 1 === 1
          ? 11
          : today.getMonth() - 1;
      console.log("before", monthBeforeLast);
      const q = query(collection(db, "totalcost"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if ((doc.data().year = thisYear)) {
            setYeatCost((yearCost) => yearCost + doc.data().cost);
          }
          switch (doc.data().month) {
            case thisMonth:
              setMonthCost((monthCost) => monthCost + doc.data().cost);
              break;
            case lastMonth:
              if (lastMonth === 12) {
                if (doc.data().year === lastYear) {
                  setLastMonthCost(
                    (lastMonthCost) => lastMonthCost + doc.data().cost
                  );
                }
              } else {
                setLastMonthCost(
                  (lastMonthCost) => lastMonthCost + doc.data().cost
                );
              }
              break;
            case monthBeforeLast:
              if (lastMonth === 11 || 12) {
                if (doc.data().year === lastYear) {
                  setMonthBeforeLastCost(
                    (monthBeforeLastCost) =>
                      monthBeforeLastCost + doc.data().cost
                  );
                }
              } else {
                setMonthBeforeLastCost(
                  (monthBeforeLastCost) => monthBeforeLastCost + doc.data().cost
                );
              }
              break;
            default:
              console.log("?????????");
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
        ???????????????
      </h1>
      <div>{monthCost}</div>
      <h1 className="my-3 p-2 text-center text-2xl text-white bg-indigo-400 font-bold rounded">
        ???????????????
      </h1>
      <div>{lastMonthCost}</div>
      <h1 className="my-3 p-2 text-center text-2xl text-white bg-indigo-400 font-bold rounded">
        ??????????????????
      </h1>
      <div>{monthBeforeLastCost}</div>
      <h1 className="my-3 p-2 text-center text-2xl text-white bg-indigo-400 font-bold rounded">
        ???????????????
      </h1>
      <div>{yearCost}</div>
    </div>
  );
};

export default Cost;
