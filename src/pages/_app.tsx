import "../styles/globals.css";
import {AppProps} from "next/app";
import {useCallback, useEffect, useState} from "react";
import ThemeContext, {ThemeContextType} from "../shared/theme-context";
import TopBar from "../components/top-bar";
import Drawer from "../components/drawer";

const MyApp = ({Component, pageProps}: AppProps) => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeContextType["theme"]>("dark");

  useEffect(() => {
    const persistedTheme =
      (localStorage.getItem("theme") ?? "dark") as ThemeContextType["theme"];
    if (persistedTheme == "light") {
      document.documentElement.classList.remove("dark");
    }
    setTheme(persistedTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    if (theme == "light") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className="flex flex-col w-full">
        <header className="fixed top-0 w-full z-40">
          <TopBar onMenuClicked={() => setOpen(true)}/>
        </header>
        <Drawer open={open} onClose={() => setOpen(false)}/>
        <main className="flex justify-center w-full max-w-full md:px-2">
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeContext.Provider>
  );
};

export default MyApp;
