const Footer = () => {
  return (
    <footer className="flex flex-col items-center w-full pt-4 pb-1 px-2
      text-sm text-center text-gray-500 dark:text-gray-400"
    >

      <div>
        {"Built with "}
        <Anchor href="https://nextjs.org/" label="Next.js"/>
        {" and "}
        <Anchor href="https://tailwindcss.com/" label="Tailwind CSS"/>
      </div>
      <div>
        {"The design is inspired from "}
        <Anchor href="https://dev.to/" label="DEV"/>
      </div>
      <img
        className="inline h-8 w-8"
        src={"/static/icons/heart.svg"}
        alt="love"
      />
    </footer>
  );
};

type AnchorProps = {
  href: string,
  label: string,
};

const Anchor = ({href, label}: AnchorProps) => {
  return (
    <a
      className="text-black dark:text-white font-bold
        hover:text-mineta-dark dark:hover:text-mineta"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {label}
    </a>
  );
};

export default Footer;