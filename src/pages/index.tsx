export default function Home() {
  return (
    <div
      className="relative flex flex-col md:items-center p-4 bg-knight w-full mt-10 md:mt-16">
      <img
        className="absolute rounded-full
        -top-8 md:-top-14 md:right-1/2
        transform translate-x-4 md:translate-x-16
        w-16 h-16 md:w-32 md:h-32
        border-black border-4 md:border-8"
        src="https://res.cloudinary.com/practicaldev/image/fetch/s--qA0FP85X--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/502592/845fdc41-e1fc-4e5d-a125-ced7144f85b2.jpeg"
        alt="Profile photo"
      />
      <h1
        className="mt-8 md:mt-16 text-white text-3xl font-bold mb-2">
        Abdou Ouahib
      </h1>
      <p className="text-gray-200 mb-2">
        Type-safe Software Developer 🚀 Tech Writer ✍️
      </p>
      <div className="flex flex-wrap">
        <HeaderLink icon="fa fa-map-marker" label="Morocco"/>
        <HeaderLink
          icon="fa fa-github"
          label="GitHub"
          href="https://github.com/aouahib"
        />
        <HeaderLink
          icon="fa fa-twitter"
          label="Twitter"
          href="https://twitter.com/AbdoOuahib"
        />
      </div>
    </div>
  );
}

type HeaderLinkProps = {
  icon: string,
  href?: string,
  label?: string,
};

const HeaderLink = (props: HeaderLinkProps) => {
  return (
    <a
      className={`flex items-center
      text-sm text-gray-400 ${props.href && "hover:text-mineta"}
      pr-8 pt-2 pb-2`}
      href={props.href}
      target="_blank"
    >
      <i className={`${props.icon} ${"mr-2 text-2xl"}`}/>
      {props.label}
    </a>
  );
};