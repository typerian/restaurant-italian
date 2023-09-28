import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Notification from "@/components/Notification";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ClerkProvider {...pageProps}>
        <Notification />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        <ToastContainer position="bottom-right" theme="dark" autoClose={3000}/>
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
