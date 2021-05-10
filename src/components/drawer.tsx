import IconButton from "./icon-button";
import {useEffect, useRef, useState} from "react";

type DrawerProps = {
  open: boolean,
  onClose: () => void,
}

const Drawer = (props: DrawerProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (props.open) setMounted(true);
    else setOpen(false);
  }, [props.open]);

  useEffect(() => {
    if (mounted) setTimeout(() => setOpen(true), 20);
  }, [mounted]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (!open) timer.current = setTimeout(() => setMounted(false), 300);
  }, [open]);

  if (!mounted) return null;
  return (
    <div
      className="flex h-screen w-screen absolute z-40 overflow-hidden">
      <div
        className={`flex flex-col w-80 max-w-full h-screen bg-white dark:bg-knight 
          absolute  ${!open && "-left-80"} ${open && "-left-0"}
          transition-absolution duration-300 ease-out`}
      >
        <div
          className="flex justify-between items-center
            text-black dark:text-white text-xl font-bold
            pl-4 py-2 border-b border-black dark:border-white
            border-opacity-10 dark:border-opacity-10"
        >
          Abdou's Corner
          <IconButton onClick={props.onClose} icon="fa fa-times"/>
        </div>
      </div>
      <div
        className={`flex-grow bg-black 
          transition-opacity duration-300 
          ${!open && "bg-opacity-0"} ${open && "bg-opacity-30"}`}
        onClick={props.onClose}
      />
    </div>
  );
};

export default Drawer;