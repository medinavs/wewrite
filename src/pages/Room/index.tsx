import { ArrowLeft, ArrowRight, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../../database/client";
import { ProfileAvatar } from "../../components/ui/Avatar";
import { getRoomById } from "../../http/get-rooms";
import { showToast } from "../../components/ui/Toast";
import { User, getUser } from "../../http/get-user";
import {
  CardHeader,
  CardsContainer,
  CardTitle,
  Container,
  ExitButton,
  Footer,
  ConfirmButton,
  ParticipantContainer,
  ParticipantName,
  ParticipantsContainer,
  TitleContainer,
  WritersCount,
} from "./styles";

export function Room() {
  const [participants, setParticipants] = useState<User[]>([]);
  const [isRoomFull, setIsRoomFull] = useState(false);
  const [isRoomOwner, setIsRoomOwner] = useState(false);
  const [roomTheme, setRoomTheme] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();

  async function joinRoom() {
    try {
      if (!roomId) return;

      const userData = await getUser();
      if (!userData) {
        showToast({
          message: "Você precisa estar logado para entrar na sala",
          type: "error",
          position: "bottom-right",
        });
        navigate("/");
        return;
      }

      setCurrentUserId(userData.id);

      const room = await getRoomById(roomId);
      if (!room) {
        showToast({
          message: "Sala não encontrada",
          type: "error",
          position: "bottom-right",
        });
        navigate("/");
        return;
      }

      const normalizedUserId =
        typeof userData.id === "object" ? userData.id : userData.id;

      const userExists = room.users?.some(
        (user) => user.id === normalizedUserId
      );

      if (!userExists) {
        if (room.users?.length >= 4) {
          showToast({
            message: "Sala cheia",
            type: "error",
            position: "bottom-right",
          });
          navigate("/");
          return;
        }

        // create normal user object
        const sanitizedUser = {
          id: normalizedUserId,
          name: userData.name,
          avatar: userData.avatar,
          email: userData.email,
          created_at: userData.created_at,
        };

        // add user to room
        const updatedUsers = [...(room.users || []), sanitizedUser];

        // verify if have duplicate users
        const uniqueUsers = updatedUsers.filter(
          (user, index, self) =>
            index === self.findIndex((u) => u.id === user.id)
        );

        await client
          .from("rooms")
          .update({ users: uniqueUsers })
          .eq("id", roomId);

        console.log("Usuário adicionado à sala");
      } else {
        console.log("Usuário já está na sala");
      }
    } catch (error) {
      console.error("Erro ao entrar na sala:", error);
    }
  }

  useEffect(() => {
    // load inicial room data
    async function loadRoomData() {
      if (!roomId) return;

      const room = await getRoomById(roomId);
      if (!room) {
        showToast({
          message: "Sala não encontrada",
          type: "error",
          position: "bottom-right",
        });
        navigate("/");
        return;
      }

      setParticipants(room.users || []);
      setRoomTheme(room.theme);

      // check if the user is the room owner
      const userData = await client.auth.getUser();
      setIsRoomOwner(userData.data?.user?.id === room.user_id);
      setCurrentUserId(userData.data?.user?.id || null);

      // check if the room is full
      setIsRoomFull(room.users?.length >= 4);

      if (room.stage === "WRITING") {
        navigate(`/rooms/${roomId}/story`);
      }
    }

    loadRoomData();
    // here add user to room
    joinRoom();

    // this enable websocket connection
    const subscription = client
      .channel(`room:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${roomId}`,
        },
        (payload) => {
          // here is for update the room data
          console.log("Received room update:", payload.new);
          setParticipants(payload.new.users || []);
          setIsRoomFull(payload.new.users?.length >= 4);

          if (payload.new.stage === "WRITING") {
            navigate(`/rooms/${roomId}/story`);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId, navigate]);

  const handleExit = async () => {
    try {
      if (!currentUserId || !roomId) return;

      const room = await getRoomById(roomId);
      if (room) {
        const updatedUsers = room.users.filter(
          (user) => user.id !== currentUserId
        );

        await client
          .from("rooms")
          .update({ users: updatedUsers })
          .eq("id", roomId);
      }

      navigate("/");
    } catch (error) {
      console.error("Erro ao sair da sala:", error);
    }
  };

  const handleStart = async () => {
    if (!isRoomOwner || !isRoomFull) return;

    try {
      // update room stage to WRITING
      await client
        .from("rooms")
        .update({ stage: "WRITING", started_at: new Date().toISOString() })
        .eq("id", roomId);

      navigate(`/rooms/${roomId}/story`);
    } catch (error) {
      console.error("Erro ao iniciar a história:", error);
    }
  };

  return (
    <Container>
      <CardsContainer>
        <CardHeader>
          <TitleContainer>
            <CardTitle>Sala de espera - {roomTheme}</CardTitle>
            <WritersCount>
              <Users size={12} />
              <span>{participants.length} / 4</span>
            </WritersCount>
          </TitleContainer>
        </CardHeader>
        <ParticipantsContainer>
          {participants.map((participant) => (
            <ParticipantContainer key={participant.id}>
              <ProfileAvatar size="lg" imageUrl={participant.avatar || ""} />
              <ParticipantName>{participant.name}</ParticipantName>
            </ParticipantContainer>
          ))}

          {Array.from({ length: Math.max(0, 4 - participants.length) }).map(
            (_, index) => (
              <ParticipantContainer key={`empty-${index}`}>
                <ProfileAvatar size="lg" imageUrl="" />
                <ParticipantName>Aguardando...</ParticipantName>
              </ParticipantContainer>
            )
          )}
        </ParticipantsContainer>
        <Footer>
          <ExitButton onClick={handleExit}>
            <ArrowLeft size={18} />
            Sair
          </ExitButton>
          <ConfirmButton
            onClick={handleStart}
            disabled={!isRoomOwner || !isRoomFull}
          >
            Começar
            <ArrowRight size={18} />
          </ConfirmButton>
        </Footer>
      </CardsContainer>
    </Container>
  );
}
