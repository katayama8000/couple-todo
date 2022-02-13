import React, { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
//global
import { flagState } from "../pages/index";
//FB
import { doc, deleteDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const DoneModal = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const renderFlgRef = useRef(false);
  const { register, handleSubmit } = useForm<IFormInput>();

  interface IFormInput {
    cost: number;
  }

  const onSubmit: SubmitHandler<IFormInput> = async (Amount: IFormInput) => {
    console.log(Amount);
    console.log(Amount.cost);
    let amountCost = Number(Amount.cost);
    console.log(typeof amountCost);

    setTotalAmount(Amount.cost);
    let today = new Date();
    await addDoc(collection(db, "totalcost"), {
      cost: amountCost,
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
      sec: today.getMilliseconds(),
    });

    flagState.doneFlag = false;
    await deleteDoc(doc(db, "shopping", "list"));
  };

  const shoppingIsOver = (): void => {
    flagState.doneFlag = false;
  };

  return (
    <div>
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-60 text-center">
          <div
            className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-black">
              合計金額
            </div>
            <div className="text-gray-400">
              0~10万までの数字を<br></br>入力してください
            </div>

            <div className="flex justify-center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="number"
                  {...register("cost", { min: 0, max: 100000 })}
                  className="bg-indigo-400 text-center flex justify-center p-2"
                />
                <input type="submit" />
              </form>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleSubmit(onSubmit)}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-400 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                買い物終了
              </button>
              <button
                onClick={() => {
                  shoppingIsOver();
                }}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
              >
                戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

