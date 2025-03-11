import { Bell } from "lucide-react";
import {
  ActionsContainer,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  Logo,
  MenuButton,
  NavContainer,
  NotificationButton,
} from "./styles";
import { ProfileAvatar } from "../Avatar";
import logo from "../../../public/logo.png";
import { DropdownMenu } from "radix-ui";

interface NavbarProps {
  onOpenNotification: () => void;
}

export function Navbar({ onOpenNotification }: NavbarProps) {
  return (
    <NavContainer>
      <Logo>
        <img src={logo} />| WeWrite
      </Logo>
      <ActionsContainer>
        <NotificationButton onClick={onOpenNotification}>
          <Bell size={20} />
        </NotificationButton>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <MenuButton>
              <ProfileAvatar />
            </MenuButton>
          </DropdownMenu.Trigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="end" sideOffset={5}>
              <div className="d-flex align-items-center gap-2 p-2">
                <ProfileAvatar />
                <div className="d-flex flex-column">
                  <span className="fs-6 fw-medium">Nome teste</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu.Root>
      </ActionsContainer>
    </NavContainer>
  );
}
