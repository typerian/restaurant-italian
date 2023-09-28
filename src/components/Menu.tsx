"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartIcon from "./CartIcon";

const Menu = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { id: 1, title: "Inicio", url: "/" },
    { id: 2, title: "Menu", url: "/menu" },
    { id: 3, title: "Horas trabajando", url: "/" },
    { id: 4, title: "Contacto", url: "/" },
  ];

  const user = false;

  return (
    <div>
      {!open ? (
        <Image
          src="/open.png"
          width={20}
          height={20}
          alt=""
          onClick={() => setOpen(true)}
        />
      ) : (
        <Image
          src="/close.png"
          width={20}
          height={20}
          alt=""
          onClick={() => setOpen(false)}
        />
      )}
      {open && (
        <div className="absolute left-0 top-24 z-10 flex h-[calc(100vh-6rem)] w-full flex-col items-center justify-center gap-8 bg-red-500 text-white">
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}
          {!user ? (
            <Link href="/login" onClick={() => setOpen(false)}>
              Inicar Sesión
            </Link>
          ) : (
            <Link href="/orders" onClick={() => setOpen(false)}>
              Ordenes
            </Link>
          )}
          <Link href="/cart" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
