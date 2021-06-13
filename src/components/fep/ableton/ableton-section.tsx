import {ReactNode} from "react";

type AbletonSectionProps = {
  header: ReactNode,
  paragraph: ReactNode
  footer: ReactNode,
}

const AbletonSection = ({header, paragraph, footer}: AbletonSectionProps) => {
  return (
    <div className="flex flex-col mb-20 items-center">
      <div className="flex flex-col items-center max-w-[40rem] mx-[10%] mb-20">
        <div className="lg:text-2xl font-medium lg:leading-10 mb-4">
          {header}
        </div>
        <div
          className="text-sm lg:text-base leading-6 lg:leading-7">{paragraph}</div>
      </div>
      {footer}
    </div>
  );
};

export type AbletonSectionLink = {
  label: string
};

export const AbletonSectionLink = ({label}: AbletonSectionLink) => {
  return (
    <a className="text-[#0000ff]" href={`#${label}`}>{label}</a>
  );
};

export default AbletonSection;