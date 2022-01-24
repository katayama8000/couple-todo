import React, { useState } from "react";

const useInputSum = () => {
  const [sum, setSum] = useState<number>();
  const [tmpSum, setTmpSum] = useState<number>();
  const handleOnSubmit = () => {
    if (!sum) {
      alert("合計金額を入力してください");
      return;
    }
    setSum(tmpSum);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.valueAsNumber);
    setTmpSum(e.target.valueAsNumber);
  };

  return { sum, handleOnSubmit, handleOnChange };
};

export const DoneModal = (props: any) => {
  const { sum, handleOnSubmit, handleOnChange } = useInputSum();

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

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleOnSubmit();
              }}
              className="my-5"
            >
              <input
                type="number"
                value={sum}
                onChange={(e) => handleOnChange(e)}
                className="bg-indigo-400"
              />
              <input type="submit" value="追加" onSubmit={handleOnSubmit} />
            </form>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-400 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                買い物終了
              </button>
              <button
                onClick={props.onClick}
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
