import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useAppSelector } from "@/redux/hooks";
import Tooltip from "./Tooltip";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";

const Leftbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mutate: logout, isSuccess } = useSignOutAccount();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  //^ ------------ Hover Tooltip --------------------

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-5 w-full h-full">
        <Link to={"/"} className="flex items-center">
          <Tooltip tip={"Tweetbook"} className="top-full left-full ">
            <img
              src="/public/assets/images/logo.svg"
              alt="logo"
              width={60}
              height={60}
            />
            {/* <h1 className='text-2xl font-bold'>tweetbook</h1> */}
          </Tooltip>
        </Link>

        <ul className="flex flex-col gap-4 items-center h-3/4 justify-evenly">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname == link.route;
            return (
              <li key={link.label} className="leftsidebar-link">
                <NavLink to={link.route}>
                  <Tooltip tip={link.label} className="top-full left-full ml-2">
                    <img
                      src={isActive ? link.imgURLActive : link.imgURL}
                      alt={link.label}
                    />
                  </Tooltip>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {isAuthenticated ? (
        <div className="flex flex-col gap-5">
          <Tooltip tip={"Profile"}>
            <Link to={`/profile/${user.id}`} className="flex-center gap-2">
              <img
                src={
                  user.imageUrl ||
                  "/public/assets/icons/profile-placeholder.svg"
                }
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
            </Link>
          </Tooltip>

          <Button onClick={() => logout()}>
            <Tooltip tip={"Logout"} className="bottom-1/2 left-full ml-2">
              <img
                src="/public/assets/icons/logout-mine.svg"
                alt="logout"
                className=""
              />
            </Tooltip>
          </Button>
        </div>
      ) : (
        <Button onClick={() => navigate("/sign-in")}>
          <Tooltip tip={"Login"} className="bottom-1/2 left-full ml-2">
            <img
              src="/public/assets/icons/login.svg"
              alt="login"
              className=""
            />
          </Tooltip>
        </Button>
      )}
    </nav>
  );
};

export default Leftbar;
