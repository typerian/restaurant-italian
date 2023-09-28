"use state";
import Image from "next/image";
import { useEffect, useState } from "react";

const Slider = () => {
  const data = [
    {
      id: 1,
      title: "siempre fresca & siempre crugiente & siempre caliente",
      image: "/slide1.png",
    },
    {
      id: 2,
      title: "entregamos tu orden donde quieras que este en SJM",
      image: "/slide2.png",
    },
    {
      id: 3,
      title: "el mejor combo para compartir con tu familia",
      image: "/slide3.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      3000,
    );
    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col bg-fuchsia-50 md:h-[calc(100vh-9rem)] lg:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 font-bold text-red-500">
        <h1 className="p-4 text-center text-5xl uppercase md:p-10 md:text-6xl xl:text-7xl">
          {data[currentSlide]?.title}
        </h1>
        <button className="bg-red-500 px-8 py-4 text-white">
          Ordenar Ahora
        </button>
      </div>
      <div className="relative w-full flex-1">
        {data.at(currentSlide)?.image && (
          <Image
            src={
              data.at(currentSlide)?.image ??
              "https://picsum.photos/id/10/367/267"
            }
            fill
            alt=""
            className="duration-400 object-cover transition-all"
          />
        )}
      </div>
    </div>
  );
};

export default Slider;
