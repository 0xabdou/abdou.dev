import {ButtonHTMLAttributes} from "react";

type IconButtonProps = {
  icon: string
  onClick?: () => void,
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({icon, onClick, ...props}: IconButtonProps) => {
  return (
    <button
      className="rounded-full
        bg-black dark:bg-white bg-opacity-0 dark:bg-opacity-0
        hover:bg-opacity-5 dark:hover:bg-opacity-5
        h-10 w-10 mr-2"
      onClick={onClick}
      {...props}
    >
      <i className={`${icon} text-black dark:text-white text-xl`}/>
    </button>
  );
};

export default IconButton;
