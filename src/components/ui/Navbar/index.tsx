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

interface UserProps {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export function Navbar() {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);

  useEffect(() => {
    async function loadUserData() {
      const userData = await getUser();
      setCurrentUser(userData as UserProps);
    }

    loadUserData();
  }, []);

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
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu.Root>
      </ActionsContainer>
    </NavContainer>
  );
}
