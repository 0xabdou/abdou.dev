import {useCallback, useEffect, useState} from "react";

const ThemeSwitch = () => {
  const [focused, setFocused] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") == "light") {
      setOn(true);
      document.documentElement.classList.remove("dark");
    }
    // The theme is dark by default
  }, []);

  const onClick = useCallback(() => {
    if (on) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setOn(false);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setOn(true);
    }
  }, [on, setOn]);

  const mounted = useCallback((el: HTMLButtonElement) => {
    if (!el) return;
    el.onfocus = () => setFocused(true);
    el.onblur = () => setFocused(false);
    return () => {
      el.onfocus = null;
      el.onblur = null;
    };
  }, []);

  return (
    <button
      className="
        relative flex justify-between items-center h-6 w-14 px-2
        rounded-full bg-gray-600 focus:outline-none
      "
      ref={mounted}
      onClick={onClick}
    >
      <div className={`
        absolute left-1 ${on && "left-8"} transition-absolution duration-300 
        h-5 w-5 bg-white rounded-full  ${focused && "shadow-switch"}
      `}
      />
      <div className={`transition-opacity ${on ? "" : "opacity-0"}`}>🌜</div>
      <div className={`transition-opacity ${on ? "opacity-0" : ""}`}>🌞</div>
    </button>
  );
};

export default ThemeSwitch;
