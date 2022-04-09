import classNames from "classnames";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";

type AbletonStickyMenuProps = {
  scrollRef: RefObject<HTMLElement>;
};

const AbletonStickyMenu = ({ scrollRef }: AbletonStickyMenuProps) => {
  const scroll = useRef<number | null>(0);
  const [hidden, setHidden] = useState(false);

  const onScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const currentScroll = scrollRef.current.scrollTop;
    const diff = currentScroll - scroll.current!;
    if (hidden && (diff < -20 || currentScroll <= 64)) {
      setHidden(false);
    } else if (!hidden && diff > 20) {
      setHidden(true);
    }
    scroll.current = currentScroll;
  }, [scrollRef.current, hidden]);

  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", onScroll);
    return () => scrollRef.current?.removeEventListener("scroll", onScroll);
  }, [scrollRef.current, onScroll]);

  return (
    <div className="flex sticky top-0 h-16 w-full z-30">
      <div
        className={classNames(
          "flex items-center h-full w-full bg-white bg-opacity-80 transition ease duration-300",
          { "-translate-y-full": hidden, "translate-y-0": !hidden }
        )}
      >
        <StickyMenuLink label="About" active />
        <StickyMenuLink label="Jobs" />
      </div>
    </div>
  );
};

type StickyMenuLinkProps = {
  label: string;
  active?: boolean;
};

const StickyMenuLink = ({ label, active }: StickyMenuLinkProps) => {
  return (
    <a
      href={`#${label}`}
      className={`text-sm font-medium ${active ? "text-[#ff764d]" : ""} ml-8`}
    >
      {label}
    </a>
  );
};

export default AbletonStickyMenu;
