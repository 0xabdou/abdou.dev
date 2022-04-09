import classNames from "classnames";
import { useCallback, useState } from "react";

type Original = {
  href: string;
};

const Original = ({ href }: Original) => {
  const [expanded, setExpanded] = useState(false);

  const onClick = useCallback(() => {
    setExpanded((e) => !e);
  }, []);

  return (
    <div
      className={classNames(
        "flex items-center justify-center absolute bottom-6 right-2 z-[35] h-14 min-w-[3.5rem] rounded-full shadow-lg bg-knight text-white select-none",
        { "hover:bg-opacity-90": !expanded }
      )}
    >
      <div
        className={classNames("transition-all duration-300 truncate", {
          "scale-100 pl-4 w-48": expanded,
          "scale-0 w-0": !expanded,
        })}
      >
        Visit the&nbsp;
        <a
          className="hover:underline"
          href={href}
          rel="noreferrer noopener"
          target="_blank"
        >
          original website
        </a>
      </div>
      <span
        className="flex items-center justify-center h-14 w-14 cursor-pointer"
        onClick={onClick}
      >
        {!expanded && "OG"}
        {expanded && <i className="fa fa-times" aria-hidden />}
      </span>
    </div>
  );
};
export default Original;
