import {useCallback, useRef, useState} from "react";
import AbletonDropdownMenu
  from "../../components/fep/ableton/ableton-dropdown-menu";
import AbletonStickyMenu
  from "../../components/fep/ableton/ableton-sticky-menu";
import Image from "next/image";
import AbletonSection, {AbletonSectionLink} from "../../components/fep/ableton/ableton-section";
import AbletonYoutube from "../../components/fep/ableton/ableton-youtube";
import AbletonFooter from "../../components/fep/ableton/ableton-footer";
import AbletonLogo from "../../components/fep/ableton/ableton-logo";


const Ableton = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(open => !open);
  }, []);

  const colorClass = `transition transition-color duration-500
    ${menuOpen ? "text-white focus:outline-white" : "text-black focus:outline-black"}`;
  return (
    <div className={`w-full h-screen max-w-screen-xl text-black 
        ${menuOpen ? "overflow-y-hidden" : "overflow-y-auto"}`}
         ref={scrollRef}
    >
      <div
        className="relative flex flex-col w-full bg-white font-poppins">
        <AbletonDropdownMenu open={menuOpen}/>
        <header
          className={`flex items-center px-4 h-16 z-50 
          transition transition-color duration-500
          ${menuOpen ? `bg-[#0000ff]` : "bg-white shadow"}`}>
          <AbletonLogo
            className={`w-14 h-auto mr-6 fill-current cursor-pointer ${colorClass}`}
            tabIndex={1}
          />
          <div
            className={`lg:hidden flex items-center font-medium cursor-pointer ${colorClass}`}
            onClick={toggleMenu}
            tabIndex={2}
          >
            Menu
            <div style={{
              marginLeft: "0.5rem",
              borderTop: menuOpen ? undefined : "0.4rem solid black",
              borderBottom: !menuOpen ? undefined : "0.4rem solid white",
              borderLeft: "0.3rem solid transparent",
              borderRight: "0.3rem solid transparent",
            }}/>
          </div>
          <div className="hidden lg:flex lg:flex-grow items-center">

            {["Live", "Push", "Link", "Shop", "Packs", "Help", "More +"]
              .map(item => (
                <a
                  className="font-medium m-4"
                  href={`#${item}`}
                  key={`menu_${item}`}
                >
                  {item}
                </a>
              ))}
            <div className="flex-grow"/>
            <a
              className="font-medium m-4 text-[#0000ff]"
              href={"#try-live"}
            >
              Try Live for free
            </a>
            <a
              className="font-medium m-4 text-xs"
              href={"#login-or-register"}
            >
              Login or register
            </a>
          </div>
        </header>
        <AbletonStickyMenu scrollRef={scrollRef}/>
        <div
          className="flex relative h-screen max-h-[600px] w-auto mx-[10%] mb-24">
          <Image
            className="z-0"
            src={"/static/images/fep/ableton/header.png"}
            layout="fill"
            objectFit="cover"
          />
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FD5948]
          font-medium m-auto z-10">
            Ableton
          </h1>
        </div>
        <AbletonSection
          header={
            <>
              We make&nbsp;
              <AbletonSectionLink label="Live"/>,&nbsp;
              <AbletonSectionLink label="Push"/> and&nbsp;
              <AbletonSectionLink label="Link"/> -
              hardware for music creation and performance. With these
              products, our community of users creates amazing things.
            </>
          }
          paragraph={<>
            Ableton was founded in 1999 and released the first version of Live
            in 2001. Our products are used by a community of dedicated musicians
            , sound designers, and artists from across the world.
          </>}
          footer={
            <div
              className="flex items-center justify-between relative w-full h-[55vw] max-h-[900px] px-[10%]">
              <div className="absolute right-0 w-[55vw] h-[55vw] bg-[#fbffa7]
               max-w-[900px] max-h-[900px]"/>
              <div className="relative w-[40vw] h-[40vw]
               max-w-[500px] max-h-[500px] flex-shrink-0">
                <Image
                  className="z-10"
                  src={"/static/images/fep/ableton/photo-1.png"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div
                className="relative w-[30vw] h-[25vw] max-w-[430px] max-h-[300px]">
                <Image
                  className="z-10"
                  src={"/static/images/fep/ableton/photo-2.png"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          }
        />
        <AbletonSection
          header={
            <>
              Making music isn’t easy. It takes time, effort, and learning. But
              when you’re in the flow, it’s incredibly rewarding.
            </>
          }
          paragraph={<>
            We feel the same way about making Ableton products. The driving
            force behind Ableton is our passion for what we make, and the
            people we make it for
          </>}
          footer={<AbletonYoutube/>}
        />
        <AbletonSection
          header={
            <>
              We are more than 350 people from 30 different countries divided
              between our headquarters in Berlin and our offices in Los Angeles
              and Tokyo.
            </>
          }
          paragraph={<>
            Most of us are active musicians, producers, and DJs, and many of us
            use Live and Push every day. We come from a wide range of cultural
            and professional backgrounds. Some of us have PhDs, some are
            self-taught, and most of us are somewhere in between. What connects
            us is the shared belief that each of us has the skills and knowledge
            to contribute to something big: helping to shape the future of music
            culture.
          </>}
          footer={
            <div
              className="flex items-center justify-between relative w-full h-[70vw]
              max-h-[1100px] my-8 px-[10%]">
              <div
                className="absolute left-0 w-[58vw] max-w-[900px] h-full bg-[#b6ffc0]"/>
              <div className="flex flex-col h-full justify-around">
                <div
                  className="relative w-[35vw] h-[25vw] max-w-[500px] max-h-[370px]">
                  <Image
                    className="z-10"
                    src={"/static/images/fep/ableton/photo-3.png"}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div
                  className="relative w-[35vw] h-[25vw] max-w-[500px] max-h-[370px]">
                  <Image
                    className="z-10"
                    src={"/static/images/fep/ableton/photo-4.png"}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div
                className="relative w-[40vw] h-[40vw] max-w-[444px] max-h-[444px]">
                <Image
                  className="z-10"
                  src={"/static/images/fep/ableton/photo-5.png"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          }
        />
        <AbletonSection
          header={
            <>
              We believe it takes focus to create truly outstanding instruments.
              We only work on a few products and we strive to make them great.
            </>
          }
          paragraph={<>
            Rather than having a one-size-fits-all process, we try to give our
            people what they need to work their magic and grow. We’ve learned
            that achieving the best results comes from building teams that are
            richly diverse, and thus able to explore problems from a wider set
            of perspectives. We don’t always agree with each other, but opinion
            and debate are valued and openly encouraged.
          </>}
          footer={
            <div
              className="relative w-[82vw] h-[44vw] max-w-[1200px] max-h-[750px]">
              <Image
                className="z-10"
                src={"/static/images/fep/ableton/photo-6.png"}
                layout="fill"
                objectFit="cover"
              />
            </div>
          }
        />
        <AbletonSection
          header={
            <>
              We’re passionate about what we do, but we’re equally passionate
              about improving who we are.
            </>
          }
          paragraph={<>
            <p className="pb-4">
              We work hard to foster an environment where people can grow both
              personally and professionally, and we strive to create a wealth of
              opportunities to learn from and with each other.
            </p>
            <p>
              Alongside an internal training program, employees are actively
              supported in acquiring new knowledge and skills, and coached on
              applying these in their daily work. In addition, staff-organized
              development and music salons are a chance to discuss new
              technologies, production techniques and best practices.
            </p>
          </>}
          footer={
            <div
              className="flex items-center justify-between relative w-full h-[55vw] max-h-[900px]">
              <div className="absolute w-[70vw] h-full bg-[#d5b3ff]
              left-1/2 transform -translate-x-1/2
              max-w-[1000px]"/>
              <div
                className="relative w-[35vw] h-[25vw] ml-[5%] max-w-[500px] max-h-[370px]">
                <Image
                  className="z-10"
                  src={"/static/images/fep/ableton/photo-7.png"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div
                className="relative w-[38vw] h-[38vw] max-w-[600px] max-h-[600px]">
                <Image
                  className="z-10"
                  src={"/static/images/fep/ableton/photo-8.png"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          }
        />
        <AbletonSection
          header={
            <>
              We want our employees to love it here. Since we’re looking for
              exceptional talent from around the world, we will do everything
              we can to make your transition as easy as possible.
            </>
          }
          paragraph={<>
            If you're joining us in Berlin, we'll help with relocation and
            paperwork. We’ll even provide you with free German or English
            lessons. Plus, working in Germany means you can expect comprehensive
            health insurance for you and your family, as well as generous
            maternity and paternity leave. Office hours are flexible, but it’s
            not all work; we have several company and team outings throughout
            the year as well as a variety of fun, informal small-group
            activities.
          </>}
          footer={
            <div
              className="flex flex-col xl:flex-row items-center xl:items-start w-[80%]  ">
              <div
                className="relative w-[80vw] h-[38vw] max-w-[600px] max-h-[600px] flex-shrink-0">
                <Image
                  className="z-10"
                  src={"/static/images/fep/ableton/photo-9.png"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col justify-center p-[8%]
                w-[80vw] min-h-[38vw] max-h-[600px] max-w-[600px] bg-[#b1c5ff] font-medium
                lg:text-2xl leading-7 lg:leading-9 py-16 xl:p-28">
                <p>
                  We’re really proud of the work we’ve done so far. But there’s
                  so much more to come. If you’d like to be a part of it, please
                  join us.
                </p>
                <a
                  href={"#latest-jobs"}
                  className="inline-block text-[#0000ff] mt-6"
                >
                  {"See latest jobs >"}
                </a>
              </div>
            </div>
          }
        />
        <AbletonFooter/>
      </div>
    </div>
  );
};

export default Ableton;