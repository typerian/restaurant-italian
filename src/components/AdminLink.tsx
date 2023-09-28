import Link from "next/link";
import { useAuth, SignOutButton } from "@clerk/nextjs";

export const AdminLink = () => {
  const { isSignedIn } = useAuth();
  return (
    <div>
      {isSignedIn ? (
        <div>
          <Link href="/orders">PEDIDOS</Link>
          <SignOutButton>
            <button className="ml-4 cursor-pointer uppercase">
              Cerrar Sesión
            </button>
          </SignOutButton>
        </div>
      ) : (
        <Link href="/login" className="uppercase">
          Iniciar Sesión
        </Link>
      )}
    </div>
  );
};
