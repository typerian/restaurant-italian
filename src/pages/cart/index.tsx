import { useCarritoStore } from "@/store";
import Image from "next/image";
import React, { useEffect } from "react";

const CartPage = () => {
  const { totalItems, totalPrice, removeFromCart, carrito } =
    useCarritoStore();

  useEffect(() => {
    void useCarritoStore.persist.rehydrate();
  }, []);

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col text-red-500 md:h-[calc(100vh-9rem)] lg:flex-row">
      <div className="flex h-1/2 flex-col justify-center overflow-scroll p-4 lg:h-full lg:w-2/3 lg:px-20 xl:px-40 2xl:w-1/2">
        {carrito.map((producto, index) => (
          <div key={index} className="mb-4 flex items-center justify-between ">
            <Image src={producto.img} alt="" width={100} height={100} />
            <div className="">
              <h1 className="text-xl font-bold uppercase">
                {producto.title} <span className="text-sm">x</span>
                {producto.quantity}
              </h1>
              <span>{producto.optionalTitle}</span>
            </div>
            <h2 className="font-bold">${producto.price}</h2>
            <span
              className="cursor-pointer"
              onClick={() => removeFromCart(producto)}
            >
              ❌
            </span>
          </div>
        ))}
      </div>

      <div className="flex h-1/2 flex-col justify-center gap-4 bg-fuchsia-50 p-4 lg:h-full lg:w-1/3 lg:px-20 xl:px-40 2xl:w-1/2 2xl:gap-6 2xl:text-xl">
        <div className="flex justify-between">
          <span className="">Subtotal ({totalItems})</span>
          <span className="">${totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Costo del Servicio</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Costo del Delivery</span>
          <span className="text-green-500">GRATIS!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL</span>
          <span className="font-bold">${totalPrice}</span>
        </div>
        <button className="w-1/2 self-end rounded-md bg-red-500 p-3 text-white">
          Pagar
        </button>
      </div>
    </div>
  );
};

export default CartPage;
