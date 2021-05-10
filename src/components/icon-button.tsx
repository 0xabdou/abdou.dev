type IconButtonProps = {
  icon: string
  onClick?: () => void,
};

const IconButton = ({icon, onClick}: IconButtonProps) => {
  return (
    <button
      className="rounded-full
        bg-black dark:bg-white bg-opacity-0 dark:bg-opacity-0
        hover:bg-opacity-5 dark:hover:bg-opacity-5
        focus:bg-opacity-5 dark:focus:bg-opacity-5
        focus:outline-none dark:focus:outline-none
        h-10 w-10 mr-2"
      onClick={onClick}
    >
      <i className={`${icon} text-black dark:text-white text-xl`}/>
    </button>
  );
};

export default IconButton;
