import React from "react";
import { Link, useLocation } from "react-router-dom";
import { bottomBarLinks } from "@/constants";
import FloatingButton from "./FloatingButton";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <div className="bottom-bar">
    {(pathname != "/create-post") && <FloatingButton link="/create-post"/>}
      {bottomBarLinks.map((link) => {
        // const isActive = pathname.includes(link.route);
        const isActive = pathname == link.route;
        return (
            <Link to={link.route} key={link.label} className="flex flex-col items-center gap-2" >
                <img
                  src={isActive ? link.imgURLActive : link.imgURL}
                  alt={link.label}
                  />
                <p className="tiny-medium text-center">{link.label}</p>
            </Link>
        );
      })}
    </div>

  );
};

export default Bottombar;
