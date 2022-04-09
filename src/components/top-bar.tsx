import Link from "next/link";
import IconButton from "./icon-button";
import ThemeSwitch from "./theme-switch";

type TopBarProps = {
  onMenuClicked: () => void;
};

const TopBar = (props: TopBarProps) => {
  return (
    <div
      className="flex items-center h-14 p-2
        bg-white dark:bg-knight shadow"
    >
      <IconButton
        icon="fa fa-bars"
        onClick={props.onMenuClicked}
        aria-label="Open menu"
        title="Menu"
        aria-haspopup
      />
      <Link href="/">
        <a
          className="flex items-center content-center
          text-white dark:text-black
          bg-black dark:bg-white hover:bg-gray-600 dark:hover:bg-gray-300
          text-xl font-bold
          h-10 px-2
          rounded cursor-pointer"
          aria-label="Go home"
          title="Home"
        >
          ABDOU
        </a>
      </Link>
      <div className="grow" />
      <ThemeSwitch />
    </div>
  );
};

export default TopBar;
