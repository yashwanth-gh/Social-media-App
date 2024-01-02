import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useAppSelector } from "@/redux/hooks";
import Tooltip from "./Tooltip";

const Topbar = () => {
  const navigate = useNavigate();
  const { mutate: logout, isSuccess } = useSignOutAccount();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-3 px-5">
        <div className="flex gap-4">
          <div className="flex items-center ml-2">
            <img src="/public/assets/icons/hamburger-open.svg" alt="hambuger" />
          </div>
          <Link to={"/"} className="flex items-center">
            <img
              src="/public/assets/images/logo.svg"
              alt="logo"
              width={70}
              height={70}
            />
            {/* <h1 className='text-2xl font-bold'>tweetbook</h1> */}
          </Link>
        </div>

        {isAuthenticated ? (
          <div className="flex gap-4">
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
      </div>
    </section>
  );
};

export default Topbar;
