import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, Users } from "lucide-react";
import { ProfileAvatar } from "../Avatar";
import {
  CardFooter,
  UsersList,
  UserCount,
  CardContent,
  CardTitle,
  TimeStamp,
  Container,
} from "./styles";

interface UserProps {
  avatar: string;
}

interface RoomCardProps {
  id: string;
  title: string;
  created_at: string;
  users: UserProps[];
  onClick?: (id: string) => void;
}

export function RoomCard({
  id,
  title,
  created_at,
  users,
  onClick,
}: RoomCardProps) {
  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: ptBR,
    });
  };

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Container onClick={handleClick}>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <TimeStamp>
          <Clock size={14} />
          {formatDate(created_at)}
        </TimeStamp>
      </CardContent>
      <CardFooter>
        <UsersList>
          {users.slice(0, 3).map((user, index) => (
            <ProfileAvatar key={index} imageUrl={user.avatar} size="sm" />
          ))}
        </UsersList>
        <UserCount>
          <Users size={12} />
          <span>{users.length}/4</span>
        </UserCount>
      </CardFooter>
    </Container>
  );
}
