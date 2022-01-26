import React from "react";
import { flagState } from '../pages/index'

export const ConfirmModal = () => {

  const shppingIsOverY = () => {
    flagState.comfirmFlag = !flagState.comfirmFlag;
    flagState.doneFlag = !flagState.doneFlag;
  }
  const shppingIsOverN = () => {
    flagState.comfirmFlag = !flagState.comfirmFlag;
  }

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
              <div>すべての商品購入をできていません</div>
              <br></br>
              <div>買い物を終了しますか？</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={() => {
                  shppingIsOverY();
                }}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-400 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                はい
              </button>
              <button
                onClick={() => {
                  shppingIsOverN();
                }}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
              >
                いいえ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
