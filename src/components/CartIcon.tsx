import { useCarritoStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const CartIcon = () => {
  const { totalItems } = useCarritoStore();

  useEffect(() => {
    void useCarritoStore.persist.rehydrate();
  }, []);

  return (
    <Link href="/cart" className="flex items-center gap-4">
      <span>Carrito ({totalItems})</span>
      <div className="relative h-8 w-8 md:h-5 md:w-5">
        <Image src="/cart.png" alt="" fill />
      </div>
    </Link>
  );
};

export default CartIcon;
