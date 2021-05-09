import Link from "next/link";
import {useCallback, useState} from "react";
import IconButton from "./icon-button";

type TopBarProps = {
  onMenuClicked: () => void,
}

const TopBar = (props: TopBarProps) => {
  return (
    <div
      className="fixed w-screen h-14 flex bg-knight items-center p-2 z-20 shadow">
      <IconButton icon="fa fa-bars" onClick={props.onMenuClicked}/>
      <Link href="/">
        <span
          className="flex items-center content-center
          bg-white hover:bg-gray-300
          text-xl font-bold
          h-10 px-2
          rounded cursor-pointer"
        >
          ABDOU
        </span>
      </Link>
      <div className="flex-grow"/>
      <Switch/>
      <IconButton icon="fa fa-search"/>
    </div>
  );
};

const Switch = () => {
  const [focused, setFocused] = useState(false);
  const [on, setOn] = useState(false);

  const onClick = useCallback(() => {
    setOn(on => !on);
  }, [setOn]);

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

export default TopBar;