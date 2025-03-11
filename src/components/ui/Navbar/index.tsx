import { Bell } from "lucide-react";
import { ActionsContainer, Logo, NavContainer, NotificationButton } from "./styles";
import { ProfileAvatar } from "../Avatar";
import logo from "../../../public/logo.png";

export function Navbar() {
    return (
        <NavContainer>
            <Logo>
                <img src={logo} />
                | WeWrite
            </Logo>
            <ActionsContainer>
                <NotificationButton>
                    <Bell size={20} />
                </NotificationButton>
                <ProfileAvatar />
            </ActionsContainer>
        </NavContainer>
    )
}