import Image from "next/image";
import { useCallback, useState } from "react";

const AbletonYoutube = () => {
  const [clicked, setClicked] = useState(false);

  const onClick = useCallback(() => {
    setClicked(true);
  }, []);

  return (
    <div className="flex flex-col py-8">
      <div
        className="relative w-[80vw] h-[45vw] max-w-[40rem] max-h-[23rem] cursor-pointer"
        onClick={onClick}
      >
        {!clicked && (
          <Image
            className=""
            src={"/static/images/fep/ableton/video-poster.png"}
            layout="fill"
            objectFit="cover"
          />
        )}
        {!clicked && (
          <div
            className="absolute top-1/2 right-1/2
                  translate-x-1/2 -translate-y-1/2
                  bg-[#0000ff] p-4 z-20 rounded-full
                  w-10 h-10
                  sm:w-20 sm:h-20
                  flex items-center justify-center"
          >
            <i
              className="fa fa-play text-white text-[1rem] sm:text-[2rem]"
              aria-hidden
            />
          </div>
        )}
        {clicked && (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/9SbnhgjeyXA?autoplay=1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Embedded youtube"
          />
        )}
      </div>
      <span className="text-xs font-medium mt-2">
        Why Ableton - Juanpe Bolivar
      </span>
    </div>
  );
};

export default AbletonYoutube;
