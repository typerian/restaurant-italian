import { DeleteButton } from "@/components/DeleteButton";
import Price from "@/components/Price";
import { useUserRole } from "@/hooks/useUserRole";
import { api } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/router";

const SingleProductPage = () => {
  const router = useRouter();
  const productId = router.query.id;
  const { role } = useUserRole();

  const { data, isLoading } = api.productRouter.getProductById.useQuery(
    productId as string,
  );

  if (isLoading) {
    return <div>Cargando producto...</div>;
  }

  return (
    <div className="relative flex h-screen flex-col justify-around p-4 text-red-500 md:flex-row md:items-center md:gap-8 lg:px-20 xl:px-40">
      {data?.img && (
        <div className="relative h-1/2 w-full md:h-[70%]">
          <Image src={data.img} alt="" fill className="object-contain" />
        </div>
      )}
      <div className="flex h-1/2 flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">
          {data?.title}
        </h1>
        <p>{data?.desc}</p>
        {data && <Price product={data} />}
      </div>
      {role === "admin" && <DeleteButton id={data?.id} />}
    </div>
  );
};

export default SingleProductPage;
