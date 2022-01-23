import React, { useState } from "react";
import type { NextPage } from "next";
import { ChangeThemeButton } from "../components/ChangeThemeButton";

const About: NextPage = () => {
  return (
    <>
      <ChangeThemeButton />
      <h1 className="text-center font-bold p-5 bg-indigo-400">
        this is a AboutPage
      </h1>
    </>
  );
};

export default About;
