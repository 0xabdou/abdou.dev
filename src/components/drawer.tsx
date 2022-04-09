import { useRouter } from "next/router";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import IconButton from "./icon-button";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

const Drawer = (props: DrawerProps) => {
  const router = useRouter();
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

  const onItemClicked = useCallback(
    (path: string) => {
      void router.push(path);
      props.onClose();
    },
    [router, props.onClose]
  );

  if (!mounted) return null;
  return (
    <nav className="fixed flex top-0 bottom-0 left-0 right-0 z-40 overflow-hidden">
      <div
        className={`flex flex-col w-80 max-w-full h-full bg-white dark:bg-knight 
          absolute  ${!open && "-left-80"} ${open && "-left-0"}
          transition-absolution duration-300 ease-out`}
      >
        <div
          className="flex justify-between items-center
            text-black dark:text-white text-xl font-bold
            pl-4 py-2 border-b border-black dark:border-white
            border-opacity-10 dark:border-opacity-10"
        >
          {"Abdou's Corner"}
          <IconButton
            onClick={props.onClose}
            icon="fa fa-times"
            aria-label="Close menu"
            title="Close"
          />
        </div>
        <div className="flex flex-col p-2">
          <MenuItem
            icon="/static/icons/house.svg"
            label="Home"
            href="/"
            onClick={onItemClicked}
          />
          <MenuItem
            icon="/static/icons/scroll.svg"
            label="Blog"
            href="/blog"
            onClick={onItemClicked}
          />
          <MenuItem
            icon="/static/icons/rocket.svg"
            label="Projects"
            href="/projects"
            onClick={onItemClicked}
          />
          <MenuItem
            icon="/static/icons/tag.svg"
            label="Tags"
            href="/tags"
            onClick={onItemClicked}
          />
          <MenuItem
            icon="/static/icons/spotify.svg"
            label="Spotify"
            href="/spotify"
            onClick={onItemClicked}
          />
          <MenuItem
            icon="/static/icons/FP.svg"
            label="Front End Practice"
            href="/front-end-practice"
            onClick={onItemClicked}
          />
        </div>
      </div>
      <div
        className={`grow bg-black
          transition-opacity duration-300 
          ${!open && "bg-opacity-0"} ${open && "bg-opacity-30"}`}
        onClick={props.onClose}
      />
    </nav>
  );
};

type MenuItemProps = {
  icon: string;
  label: string;
  href: string;
  onClick: (path: string) => void;
};

const MenuItem = (props: MenuItemProps) => {
  const onClick: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      props.onClick(props.href);
    },
    [props.onClick, props.href]
  );

  return (
    <a
      className="flex items-center p-2 cursor-pointer rounded-md
          text-black dark:text-white
          hover:text-mineta-dark dark:hover:text-mineta
          bg-black bg-opacity-0 dark:bg-white dark:bg-opacity-0
          hover:bg-opacity-10 dark:hover:bg-opacity-10"
      href={props.href}
      onClick={onClick}
    >
      <img alt="" src={props.icon} className="h-5 w-5 mr-3" />
      {props.label}
    </a>
  );
};

export default Drawer;
