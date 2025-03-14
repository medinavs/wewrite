import { Clock, Users } from "lucide-react";
import {
  AvatarsContainer,
  Container,
  Footer,
  Header,
  SubTitle,
  Title,
  WritersCount,
} from "./styles";
import { ProfileAvatar } from "../Avatar";

interface CardProps {
  title: string;
  created_at: string;
  users: [{ avatar: string }];
}

export function RoomCard({ title, created_at, users }: CardProps) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <SubTitle>
          <Clock size={14} />
          <span>{created_at}</span>
        </SubTitle>
      </Header>

      <Footer>
        <AvatarsContainer>
          {users.map((user) => (
            <ProfileAvatar size="sm" imageUrl={user.avatar} />
          ))}
        </AvatarsContainer>
        <WritersCount>
          <Users size={12} />
          <span>{users.length} / 4</span>
        </WritersCount>
      </Footer>
    </Container>
  );
}
