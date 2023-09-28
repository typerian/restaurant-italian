"use client";

import { api } from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const DeleteButton = ({ id }: { id?: string }) => {
  const router = useRouter();
  const { mutate } = api.productRouter.deleteProductById.useMutation({
    onSuccess() {
      router.push("/menu");
      toast.success("Producto eliminado de la base de datos");
    },
  });
  return (
    <button
      className="absolute right-4 top-4 rounded-full bg-red-400 p-2"
      onClick={() => mutate(id!)}
    >
      ❌
    </button>
  );
};
