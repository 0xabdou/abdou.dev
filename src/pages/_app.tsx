import "tailwindcss/tailwind.css";
import {AppProps} from "next/app";
import TopBar from "../components/top-bar";
import Drawer from "../components/drawer";
import {useState} from "react";

const MyApp = ({Component, pageProps}: AppProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex">
      <TopBar onMenuClicked={() => setOpen(true)}/>
      <Drawer open={open} onClose={() => setOpen(false)}/>
      <main className="w-screen mt-14 md:px-2">
        <Component {...pageProps} />
      </main>
    </div>
  );
};

export default MyApp;
