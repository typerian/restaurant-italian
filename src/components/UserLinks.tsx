import Link from "next/link";
import { SignOutButton, useAuth } from "@clerk/nextjs";

export const UserLink = () => {
  const { isSignedIn } = useAuth();

  return (
    <div>
      {isSignedIn ? (
        <div>
          <Link href="/orders">ORDENES</Link>
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
