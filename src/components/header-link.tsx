type HeaderLinkProps = {
  icon: string,
  href?: string,
  label?: string,
};

const HeaderLink = (props: HeaderLinkProps) => {
  const className = `flex items-center
    text-sm text-gray-500 dark:text-gray-400 
    ${props.href && "hover:text-mineta-dark dark:hover:text-mineta"}
    pr-8 pt-2 pb-2`;
  const children = (
    <>
      <div className="h-8 w-6 min-w-6 mr-2">
        <i className={`${props.icon} text-2xl`}/>
      </div>
      {props.label}
    </>
  );
  if (props.href) {
    return (
      <a
        className={className}
        href={props.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }
  return (
    <span className={className}>
      {children}
    </span>
  );
};

export default HeaderLink;