import {
  ActionsContainer,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  Logo,
  MenuButton,
  NavContainer,
} from "./styles";
import { ProfileAvatar } from "../Avatar";
import logo from "../../../public/logo.png";
import { DropdownMenu } from "radix-ui";
import { useEffect, useState } from "react";
import { getUser } from "../../../http/get-user";
import { signOut } from "../../../http/auth-sign-out";
import { useNavigate } from "react-router-dom";
import { showToast } from "../Toast";

interface UserProps {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export function Navbar() {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUserData() {
      const userData = await getUser();
      setCurrentUser(userData as UserProps);
    }

    loadUserData();
  }, []);

  const handleSignOut = async () => {
    localStorage.removeItem("wewrite-token");

    try {
      const signOutResult = await signOut();

      if (signOutResult.success) {
        navigate("/login");
      } else {
        showToast({
          message: signOutResult.error ?? "An unexpected error occurred",
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <NavContainer>
      <Logo>
        <img src={logo} />| WeWrite
      </Logo>
      <ActionsContainer>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <MenuButton>
              <ProfileAvatar size="sm" imageUrl={currentUser?.avatar || ""} />
            </MenuButton>
          </DropdownMenu.Trigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="end" sideOffset={5}>
              <div className="d-flex align-items-center gap-2 p-2">
                <ProfileAvatar size="sm" imageUrl={currentUser?.avatar || ""} />
                <div className="d-flex flex-column">
                  <span className="fs-6 fw-medium">{currentUser?.name}</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button
                  onClick={handleSignOut}
                  className="w-100"
                  style={{ all: "unset" }}
                >
                  Sair
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu.Root>
      </ActionsContainer>
    </NavContainer>
  );
}
