import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex h-12 items-center justify-between text-red-500 md:h-24 lg:px-20 xl:px-40">
      <Link href="/" className="text-xl font-bold">
        FOOD FASTER
      </Link>
      <p>TODOS LOS DERECHOS RESERVADOS</p>
    </div>
  );
};

export default Footer;
