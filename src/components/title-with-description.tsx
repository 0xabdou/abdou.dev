import {ReactNode} from "react";

type TitleWithDescriptionProps = {
  title: string,
  description: ReactNode,
};

const TitleWithDescription = (props: TitleWithDescriptionProps) => {
  return (
    <header className="flex flex-col items-start py-4 px-2
        text-gray-500 dark:text-gray-400 text-md"
    >
      <h1
        className="text-markup-h1 text-black dark:text-white font-extrabold"
      >
        {props.title}
      </h1>
      <p>{props.description}</p>
    </header>
  );
};

export default TitleWithDescription;