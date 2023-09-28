"use client ";
import { useCarritoStore } from "@/store";
import type { Decimal } from "@prisma/client/runtime/library";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ProductProps {
  product: {
    id: string;
    createdAt: Date;
    title: string;
    desc: string;
    img: string | null;
    price: Decimal;
    isFeatured: boolean;
    options: string;
    catSlug: string;
  };
}

type Opciones = {
  title: string;
  additionalPrice: number;
}[];

const Price = ({ product }: ProductProps) => {
  const parsePrice = parseFloat(product.price.toString());

  const [total, setTotal] = useState(parsePrice);
  const [cantidad, setCantidad] = useState(1);
  const [selected, setSelected] = useState(0);

  const opciones = JSON.parse(product.options) as Opciones;

  const { addToCart } = useCarritoStore();

  useEffect(() => {
    void useCarritoStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    setTotal(cantidad * (parsePrice + opciones.at(selected)!.additionalPrice));
  }, [cantidad, opciones, product.options, parsePrice, selected]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${total}</h2>
      <div className="flex gap-4">
        {opciones.map(
          (
            option: { title: string; additionalPrice: number },
            index: number,
          ) => (
            <button
              key={index}
              className="min-w-[6rem] rounded-md p-2 ring-1 ring-red-400"
              style={{
                background: selected === index ? "rgb(248 113 113)" : "white",
                color: selected === index ? "white" : "red",
              }}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ),
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex w-2/3 justify-between p-3 ring-1 ring-red-500">
          <span>Cantidad</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCantidad((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{cantidad}</span>
            <button
              onClick={() => setCantidad((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart({
              id: product.id,
              title: product.title,
              img: product.img ?? "/temporary/p1.png",
              price: total,
              optionalTitle: opciones.at(selected)!.title,
              quantity: cantidad,
            });
            toast.success("Producto agregado al carrito");
          }}
          className="w-1/3 bg-red-500 p-3 uppercase text-white ring-1 ring-red-500"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default Price;
