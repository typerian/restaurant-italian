import { featuredProducts } from "@/data";
import Image from "next/image";
import React from "react";

const Featured = () => {
  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      {/*envolvedor*/}
      <div className="flex w-max">
        {/*elemento unico*/}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="flex h-[60vh] w-screen flex-col items-center justify-around p-4  transition-all duration-300 hover:bg-fuchsia-50 md:w-[50vw] xl:h-[90vh] xl:w-[33vw]"
          >
            {/*contendor imagen*/}
            {item.img && (
              <div className="duration-400 relative w-full flex-1 transition-all hover:rotate-[30deg] ">
                <Image src={item.img} alt="" fill className="object-contain" />
              </div>
            )}
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                {item.title}
              </h1>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <button className="rounded-md bg-red-500 p-2 text-white">
                Agregar al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
