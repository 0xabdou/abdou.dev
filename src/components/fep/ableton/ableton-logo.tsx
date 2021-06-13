type AbletonLogo = {
  className?: string
  tabIndex?: number,
}

const AbletonLogo = ({className, tabIndex}: AbletonLogo) => {
  return (
    <svg className={className}
         tabIndex={tabIndex}
         version="1.1" id="Layer_1"
         xmlns="http://www.w3.org/2000/svg"
         x="0px" y="0px" width="45px" height="21px" viewBox="0 0 45 21"
         enableBackground="new 0 0 45 21"
    >
      <g>
        <rect width="3" height="21"/>
        <rect x="6" width="3" height="21"/>
        <rect x="12" width="3" height="21"/>
        <rect x="18" width="3" height="21"/>
        <g>
          <rect x="24" y="18" width="21" height="3"/>
          <rect x="24" y="12" width="21" height="3"/>
          <rect x="24" y="6" width="21" height="3"/>
          <rect x="24" width="21" height="3"/>
        </g>
      </g>
    </svg>
  );
};

export default AbletonLogo;