import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { ChangeThemeButton } from "../components/ChangeThemeButton";
import axios from 'axios'
import useSWR from "swr";

const About: NextPage = () => {
  const [judge, setJudege] = useState("No")
  //const { data, error } = useSWR("https://jsonplaceholder.typicode.com/todos");
  
  // useEffect(() => {
  //   const { data, error } = useSWR("https://yesno.wtf/api");
  //   console.log(data)
  // },[])

  const learnSWR = () => {
    
  }

  const getJudge = async () => {
    const data = await axios.get("https://yesno.wtf/api");
    setJudege(data.data.answer);
    // const json = await axios.get("jsonplaceholder.typicode.com/todos");
    // console.log(json);

    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  return (
    <>
      <ChangeThemeButton />
      <h1 className="text-center font-bold p-5 bg-indigo-400">
        this is a AboutPage
      </h1>
      <button onClick={() => getJudge()}>Yes/No</button>
      <div>{judge}</div>
      <br></br>
      <button onClick={() => learnSWR()}>SWR</button>
    </>
  );
};

export default About;
