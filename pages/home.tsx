import React, { useState } from "react";
import type { NextPage } from "next";
import useSWR from "swr";

const Home: NextPage = () => {
  const { data, error } = useSWR("https://jsonplaceholder.typicode.com/todos");
  console.log({ data, error });
  return (
    <>
      
    </>
  );
};

export default Home;
