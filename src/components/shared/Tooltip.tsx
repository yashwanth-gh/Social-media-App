import React, { useState } from "react";

type tooltipProp = {
  children: React.ReactNode;
  tip: string;
  className?: string;
};
//^ here you have to specify where the tooltip should appear i.e. position top right left bottom 
//^ compulsory 
const Tooltip = ({ children, tip,className="top-full left-full"}: tooltipProp) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="tooltip_container "
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div className={`tooltip ${className} small-regular tracking-wide`}>
        {tip}
      </div>}
    </div>
  );
};

export default Tooltip;
