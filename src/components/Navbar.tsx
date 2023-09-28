import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { UserLink } from "./UserLinks";
import { AdminLink } from "./AdminLink";
import { useUserRole } from "@/hooks/useUserRole";

const Navbar = () => {
  const { role } = useUserRole();

  return (
    <div className="flex h-12 items-center justify-between border-b-2 border-b-red-500 p-4 uppercase text-red-500 md:h-24 lg:px-20 xl:px-40">
      <div className="hidden flex-1 gap-4 md:flex">
        <Link href="/">Inicio</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contacto</Link>
      </div>
      {/*LOGO*/}
      <div className="flex-1 text-xl md:text-center md:font-bold">
        <Link href="/">Food Faster</Link>
      </div>
      {/*MOBILE MENU*/}
      <div className="md:hidden">
        <Menu />
      </div>
      {/*Enlaces de la derecha*/}
      <div className="hidden flex-1 items-center justify-end gap-4 md:flex">
        {role === "admin" ? <AdminLink /> : <UserLink />}
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
