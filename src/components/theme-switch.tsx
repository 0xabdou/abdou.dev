import {useCallback, useState} from "react";
import {useTheme} from "../shared/theme-context";

const ThemeSwitch = () => {
  const [focused, setFocused] = useState(false);
  const {theme, toggleTheme} = useTheme();

  const mounted = useCallback((el: HTMLButtonElement) => {
    if (!el) return;
    el.onfocus = () => setFocused(true);
    el.onblur = () => setFocused(false);
    return () => {
      el.onfocus = null;
      el.onblur = null;
    };
  }, []);

  const on = theme == "dark";
  return (
    <button
      className="
        relative flex justify-between items-center h-6 w-14 px-2
        rounded-full bg-gray-600 focus:outline-none
      "
      ref={mounted}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <div className={`
        absolute left-1 ${on && "left-8"} transition-absolution duration-300
        ease-out h-5 w-5 bg-white rounded-full  ${focused && "shadow-switch"}
      `}
      />
      <div className={`transition-opacity ${on ? "" : "opacity-0"}`}>🌜</div>
      <div className={`transition-opacity ${on ? "opacity-0" : ""}`}>🌞</div>
    </button>
  );
};

export default ThemeSwitch;
