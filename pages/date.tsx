import React from "react";

const date = () => {
  const day = () => {
     var yesterday = new Date();
    console.log("今日=" + yesterday);
    yesterday.setDate(yesterday.getDate() - 1);
    console.log("昨日=" + yesterday);
 
    console.log("年=" + yesterday.getFullYear());
    console.log("月=" + (yesterday.getMonth() + 1));
    console.log("日=" + yesterday.getDate());
    console.log("時=" + yesterday.getHours());
    console.log("分=" + yesterday.getMinutes());
    console.log("秒=" + yesterday.getSeconds());
 
    var gessho = new Date(2017, 4 - 1, 1);
    gessho.setDate(gessho.getDate() - 1);
    console.log("月初の昨日=" + gessho);
  };
  return (
    <div>
      <button onClick={() => day()}>button</button>
    </div>
  );
};

export default date;
