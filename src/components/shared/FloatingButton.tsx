import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const FloatingButton = ({ link }: { link: string }) => {
  return (
    <Button className="floating-btn">
      <Link to={link}>
        <img
          src="/public/assets/icons/ipost-floating.svg"
          alt="post"
          width={30}
          height={30}
        />
      </Link>
    </Button>
  );
};

export default FloatingButton;
