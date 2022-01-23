import React, { useState } from "react";

export const useCounter = () => {
  const [count, setCount] = useState(0);
  const upCount = () => {
    setCount((count) => count + 1);
  };

  const getCount = () => {
    <div>
      <button onClick={upCount}>{count}up</button>
    </div>;
  };

  return { count };
};
