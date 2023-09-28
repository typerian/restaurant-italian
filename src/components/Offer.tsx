import Image from "next/image";
import React from "react";
import CountDownComp from "./CountDown";

const Offer = () => {
  return (
    <div className="flex h-screen flex-col bg-black md:h-[70vh] md:flex-row md:justify-between md:bg-[url('/offerBg.png')]">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6 text-center">
        <h1 className="text-5xl font-bold text-white xl:text-6xl">
          Delicious Burger & French Fry
        </h1>
        <p className="text-white xl:text-xl">
          Progressively simplify effective e-toilers and process-centric methods
          of empowerment. Quickly pontificate parallel
        </p>
        <CountDownComp />
        <button className="rounded-md bg-red-500 px-6 py-3 text-white">
          Ordenar Ahora
        </button>
      </div>
      <div className="relative w-full flex-1 md:h-full">
        <Image src="/offerProduct.png" alt="" fill className="object-contain" />
      </div>
    </div>
  );
};

export default Offer;
