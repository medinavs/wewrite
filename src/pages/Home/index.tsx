import { CirclePlus, Globe } from "lucide-react";
import {
  CardsContainer,
  Container,
  Section,
  CardHeader,
  SubTitle,
  Title,
  CardTitle,
  NewStoryButton,
  StoriesContainer,
  TabListContainer,
  TabTrigger,
  StoryCardsContainer,
  StorysGrid,
} from "./styles";
import { Tabs } from "radix-ui";
import { RoomCard } from "../../components/ui/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../http/get-user";
import { Skeleton } from "@radix-ui/themes";
import { getRooms } from "../../http/get-rooms";

interface UserProps {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export function Home() {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  interface Room {
    id: string;
    name: string;
    created_at: string;
  }

  const [rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("wewrite-token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    async function loadUserData() {
      const userData = await getUser();
      setCurrentUser(userData as UserProps);
    }

    loadUserData();
  }, []);

  useEffect(() => {
    async function loadRooms() {
      const roomsData = await getRooms();
      setRooms(roomsData);
    }

    loadRooms();
  }, []);

  return (
    <Container>
      <title>Home | WeWrite</title>
      <Section>
        {!currentUser ? (
          <Skeleton width={"600px"} height={"2.35rem"} />
        ) : (
          <Title>Bem vindo {currentUser?.name} ao WeWrite</Title>
        )}
        <SubTitle>
          Crie e colabore em histórias. Se junte a diversão e deixe sua
          criatividade fluir!
        </SubTitle>
      </Section>
      <CardsContainer>
        <CardHeader>
          <CardTitle>Histórias</CardTitle>
          <NewStoryButton>
            <CirclePlus />
            Criar nova sala
          </NewStoryButton>
        </CardHeader>
        <StoriesContainer>
          <Tabs.Root defaultValue="all">
            <TabListContainer>
              <TabTrigger value="all">
                <Globe size={16} />
                Todas
              </TabTrigger>
              <TabTrigger value="myStories">Minhas Histórias</TabTrigger>
            </TabListContainer>
            <Tabs.Content value="all">
              <StoryCardsContainer>
                <StorysGrid>
                  {rooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      title={room.name}
                      created_at={room.created_at}
                      users={[{ avatar: currentUser?.avatar ?? "" }]}
                    />
                  ))}
                </StorysGrid>
              </StoryCardsContainer>
            </Tabs.Content>
            <Tabs.Content value="myStories">Following stories</Tabs.Content>
          </Tabs.Root>
        </StoriesContainer>
      </CardsContainer>
    </Container>
  );
}
