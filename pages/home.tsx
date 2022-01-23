import React, { useState } from "react";
import type { NextPage } from "next";
//import { useCounter } from "../hooks/useCounter";

const Home: NextPage = () => {
  //const { count } = useCounter();
  const click = () => console.log("hello");

  return (
    <>
      <h1 className="text-center font-bold p-5 bg-indigo-400">
        this is a Home
      </h1>
      <button onClick={() => click()}>count</button>
    </>
  );
};

export default Home;
