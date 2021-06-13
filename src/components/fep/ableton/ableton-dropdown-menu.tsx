type AbletonDropdownMenuProps = {
  open: boolean
}

const AbletonDropdownMenu = ({open}: AbletonDropdownMenuProps) => {
  return (
    <div className={`flex flex-col absolute inset-x-0 h-screen bg-[#0000ff] z-40 
      transition transition-absolution ease-in duration-300
      ${open ? "top-0" : "top-[-100vh]"} pt-20 px-4 text-white space-y-6
      overflow-y-auto`}
    >
      <MenuItem label="Live"/>
      <MenuItem label="Push"/>
      <MenuItem label="Link"/>
      <MenuItem label="Shop"/>
      <MenuItem label="Pocks"/>
      <MenuItem label="Help"/>
      <MenuItem label="Try Live for free"/>
      <MenuItem label="Log in or register" mini/>
      <MenuItem label="More on Ableton.com:" header/>
      <MenuItem label="Blog" mini/>
      <MenuItem label="Ableton for the Classroom" mini/>
      <MenuItem label="Ableton for Colleges and Universities" mini/>
      <MenuItem label="Certified Training" mini/>
      <MenuItem label="About Ableton" mini/>
      <MenuItem label="Jobs" mini/>
      <MenuItem label="More from Ableton:" header/>
      <div
        className="flex w-full space-x-4 overflow-x-auto overflow-y-hidden min-h-[7rem]">
        <MenuParagraph
          label="Loop"
          text="Watch Talks, Performances and Features from Ableton's Summit for Music Makers."
        />
        <MenuParagraph
          label="Learning Music"
          text="Learn the fundamentals of music making right in your browser."
        />
        <MenuParagraph
          label="Learning Synths"
          text="Get started with synthesis using a web-based synth and accompanying lessons."
        />
        <MenuParagraph
          label="Making Music"
          text="Some tips from 74 Creative Strategies for Electronic Producers"
        />
      </div>
    </div>
  );
};

type MenuItemProps = {
  label: string,
  mini?: boolean
  header?: boolean,
}

const MenuItem = ({header, label, mini}: MenuItemProps) => {
  const className = `${mini ? "text-xs" : "font-medium"}`;
  return header
    ? <span className={className}>{label}</span>
    : <a
      className={className}
      href={`#${label}`}>
      {label}
    </a>;
};

type MenuParagraphProps = {
  label: string,
  text: string
}

const MenuParagraph = ({label, text}: MenuParagraphProps) => {
  return (
    <a href={`#${label}`}
       className="flex flex-col w-56 h-20 flex-shrink-0 flex-grow-0">
      <span className="text-sm font-medium leading-6">{label}</span>
      <p className="text-xs font-light leading-6">{text}</p>
    </a>
  );
};

export default AbletonDropdownMenu;