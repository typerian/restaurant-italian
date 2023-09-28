import { api } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";

const CategoryPage = () => {
  const { data, isLoading } = api.productRouter.getAllProducts.useQuery();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-wrap text-red-500">
      {data?.map((item) => (
        <Link
          key={item.id}
          href={`/product/${item.id}`}
          className="group flex h-[60vh] w-full flex-col justify-between border-b-2 border-r-2 border-red-500 p-4 even:bg-fuchsia-50 sm:w-1/2 lg:w-1/3"
        >
          {item.img && (
            <div className="relative h-[80%]">
              <Image fill src={item.img} alt="" className="object-contain" />
            </div>
          )}
          <div className="flex items-center justify-between font-bold">
            <h1 className="p-2 text-2xl uppercase">{item.title}</h1>
            <h2 className="text-lg group-hover:hidden">
              ${item.price.toString()}
            </h2>
            <button className="hidden rounded-md bg-red-500 p-2 uppercase text-white transition-all duration-300 group-hover:block">
              Agregar al Carrito
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
