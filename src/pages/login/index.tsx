import Image from "next/image";
import React from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { isLoaded, isSignedIn } = useAuth();

  const router = useRouter();

  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  if (isSignedIn) {
    router.push("/");
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] items-center justify-center p-4 md:h-[calc(100vh-9rem)]">
      <div className="flex h-full w-1/2 flex-col rounded-md shadow-2xl md:h-[70%] md:w-full md:flex-row lg:w-[60%] 2xl:w-1/2">
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/loginBg.png" alt="" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-8 p-10">
          <h1 className="text-xl font-bold xl:text-3xl">Bienvenido</h1>
          <p>Inicia Sesión en tu cuenta o crea una nueva</p>
          <SignInButton redirectUrl="/">
            <button className="flex gap-4 rounded-md p-4 ring-1 ring-blue-200">
              <span>Click aqui 🖱</span>
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
