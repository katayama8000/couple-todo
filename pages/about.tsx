import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import useSWR from "swr";


const About: NextPage = () => {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
  );

  console.log({data,error})
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <>swr</>;
};

export default About;
