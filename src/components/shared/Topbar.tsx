import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { Toggle } from "../ui/toggleDarkMode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem

} from "../ui/dropdown-menu"
import { Loader } from "@/components/shared";


import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";

const Topbar = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };  

  useEffect(() => {
    
  }, [isSuccess]);
  

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">

          <div className="logo">

          </div>
        </Link>

        <div className="flex gap-4">

          {/* <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button> */}

          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => navigate(`/feedback`)}>
              Feedback
          </Button>

          {/* <Toggle 
            lightModeIcon={<img src={"/assets/icons/sun-icon.svg"}/>} darkModeIcon={<img src={"/assets/icons/moon-icon.svg"}/>}
            variant="default"
            className="shad-toggle" 
          /> */}


        {isLoading || !user.email ? (
          <div className="h-12">
            <Loader />
          </div>
          ) : (
            <DropdownMenu>
            <DropdownMenuTrigger >
              <img
                  src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                  alt="profile"
                  className="h-12 w-12 rounded-full"
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent>


              <DropdownMenuItem >
                <Button
                  variant="link"
                  className="shad-button_link"
                  onClick={() => navigate(`/profile/${user.id}`)}>
                    Profile
                </Button>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Button
                  variant="link"
                  className="shad-button_link"
                  onClick={(e) => handleSignOut(e)}>
                    Log out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

      

{/* 
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link> */}
        </div>
      </div>

      <div className="divider"/>
      
    </section>
  );
};

export default Topbar;
