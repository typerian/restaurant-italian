"use client";
import CountDown from "react-countdown";

const endingDate = new Date("2023-09-28");

const CountDownComp = () => {
  return (
    <>
      <CountDown
        className="text-5xl font-bold text-yellow-300"
        date={endingDate}
      />
    </>
  );
};

export default CountDownComp;
