import { BookOpen, CirclePlus, Globe } from "lucide-react";
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
import { RoomCard } from "../../components/ui/RoomCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../http/get-user";
import { Skeleton } from "@radix-ui/themes";
import { getRooms } from "../../http/get-rooms";
import { NewRoomModal } from "../../components/ui/RoomFormModal";
import { client } from "../../database/client";

interface UserProps {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Room {
  id: string;
  name: string;
  created_at: string;
  users: { avatar: string; id?: string }[];
}

export function Home() {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate();

  // verify if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("wewrite-token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  // load user data
  useEffect(() => {
    async function loadUserData() {
      const userData = await getUser();
      setCurrentUser(userData as UserProps);
    }

    loadUserData();
  }, []);

  // load rooms
  useEffect(() => {
    async function loadRooms() {
      const roomsData = await getRooms();
      setRooms(roomsData as Room[]);
    }

    loadRooms();

    // websocket subscription
    const subscription = client
      .channel("public:rooms")
      .on(
        "postgres_changes",
        {
          event: "*", // all events
          schema: "public",
          table: "rooms",
        },
        (payload) => {
          console.log("Rooms update:", payload);
          // if have changes in rooms, reload the rooms
          loadRooms();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // to clean empty rooms
  useEffect(() => {
    async function cleanEmptyRooms() {
      if (!rooms || rooms.length === 0) return;

      // verify rooms
      for (const room of rooms) {
        // if there are no users in the room
        if (!room.users || room.users.length === 0) {
          console.log(`Excluindo sala vazia: ${room.id} - ${room.name}`);
          try {
            await client.from("rooms").delete().eq("id", room.id);
          } catch (error) {
            console.error(`Erro ao excluir sala vazia ${room.id}:`, error);
          }
        }
      }
    }

    cleanEmptyRooms();
  }, [rooms]);

  const handleRoomClick = (roomId: string) => {
    navigate(`/rooms/${roomId}`);
  };

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
          Crie e desafie amigos com histórias. Se junte a diversão e deixe sua
          criatividade fluir!
        </SubTitle>
      </Section>
      <CardsContainer>
        <CardHeader>
          <CardTitle>Histórias</CardTitle>
          <NewRoomModal>
            <NewStoryButton>
              <CirclePlus />
              Criar nova sala
            </NewStoryButton>
          </NewRoomModal>
        </CardHeader>
        <StoriesContainer>
          <Tabs.Root defaultValue="all">
            <TabListContainer>
              <TabTrigger value="all">
                <Globe size={16} />
                Todas
              </TabTrigger>
              <TabTrigger value="myStories">
                <BookOpen size={16} />
                Minhas Histórias
              </TabTrigger>
            </TabListContainer>
            <Tabs.Content value="all">
              <StoryCardsContainer>
                <StorysGrid>
                  {rooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      id={room.id}
                      title={room.name}
                      created_at={room.created_at}
                      users={
                        room.users || [{ avatar: currentUser?.avatar ?? "" }]
                      }
                      onClick={handleRoomClick}
                    />
                  ))}
                </StorysGrid>
              </StoryCardsContainer>
            </Tabs.Content>
            <Tabs.Content value="myStories">
              <StoryCardsContainer>
                <StorysGrid>
                  {rooms
                    .filter((room) =>
                      room.users?.some((user) => user.id === currentUser?.id)
                    )
                    .map((room) => (
                      <RoomCard
                        key={room.id}
                        id={room.id}
                        title={room.name}
                        created_at={room.created_at}
                        users={room.users || []}
                        onClick={handleRoomClick}
                      />
                    ))}
                </StorysGrid>
              </StoryCardsContainer>
            </Tabs.Content>
          </Tabs.Root>
        </StoriesContainer>
      </CardsContainer>
    </Container>
  );
}
