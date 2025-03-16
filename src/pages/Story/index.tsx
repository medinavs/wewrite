import { CircleCheck, Clock } from "lucide-react";
import {
  CardHeader,
  CardsContainer,
  CardTitle,
  Container,
  Footer,
  ConfirmButton,
  EditorContainer,
  TitleContainer,
  Timer,
  Editor,
  CharacterCounterContainer,
  CircularProgress,
  CircleBackground,
  CircleProgress,
  CircleCenter,
  CharacterCounterText,
  CharacterLimitText,
  InfoContainer,
} from "./styles";
import { useEditor } from "@tiptap/react";
import CharacterCount from "@tiptap/extension-character-count";
import { useEffect, useState } from "react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../../database/client";
import { getRoomById } from "../../http/get-rooms";
import { getUser, User } from "../../http/get-user";
import { showToast } from "../../components/ui/Toast";
import { Modal } from "../../components/ui/Modal";
import { format } from "date-fns";
import { themes } from "./themes";

const WRITING_DURATION = 120; // 2 minutes

export function Story() {
  const [content, setContent] = useState("");
  const [showThemeModal, setShowThemeModal] = useState(true);
  const [theme, setTheme] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [participants, setParticipants] = useState<User[]>([]);
  const [finishedParticipants, setFinishedParticipants] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  const limit = 250;
  const navigate = useNavigate();
  const { roomId } = useParams<string>();

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      CharacterCount.configure({
        limit,
      }),
    ],
    content: "<p></p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getText());
    },
  });

  const percentage = editor ? Math.round((100 / limit) * content.length) : 0;

  // select random theme and start timer
  const selectRandomTheme = async () => {
    // only the first person should set the theme
    try {
      const room = await getRoomById(roomId as string);
      if (room && !room.theme) {
        // add this back when OpenAI API is working
        // const { response } = await getRandomTheme();

        // if (!response) {
        //   console.error("Error getting random theme");
        //   return;
        // }

        // const randomTheme = response;

        // setTheme(randomTheme);

        const randomTheme = themes[Math.floor(Math.random() * themes.length)];

        // update theme and set writing_start_time in the database
        await client
          .from("rooms")
          .update({
            theme: randomTheme,
            writing_start_time: new Date().toISOString(),
            finished_participants: [],
          })
          .eq("id", roomId);
      }

      setShowThemeModal(false);
    } catch (error) {
      console.error("Error updating theme:", error);
      setShowThemeModal(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const user = await getUser();
      if (!user) return;

      setCurrentUserId(user.id);

      await client.from("stories").insert({
        room_id: roomId,
        user_id: user.id,
        content: content,
        created_at: new Date(),
      });

      const room = await getRoomById(roomId as string);
      if (room) {
        if (
          !room.finished_participants?.map((u: User) => u.id).includes(user.id)
        ) {
          const updatedFinishedParticipants = [
            ...(room.finished_participants || []),
            user.id,
          ];

          await client
            .from("rooms")
            .update({ finished_participants: updatedFinishedParticipants })
            .eq("id", roomId);
        }
      }

      setHasSubmitted(true);
      showToast({
        message: "História enviada com sucesso!",
        type: "success",
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error submitting story:", error);
      showToast({
        message: "Erro ao enviar história",
        type: "error",
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchUserOnce = async () => {
      try {
        const user = await getUser();
        if (!isMounted) return;

        if (user) {
          setCurrentUserId(user.id);
          sessionStorage.setItem("currentUserId", user.id);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const loadRoomData = async () => {
      if (!roomId) return;

      try {
        const storedUserId = sessionStorage.getItem("currentUserId");
        if (storedUserId && isMounted) {
          setCurrentUserId(storedUserId);
        } else {
          await fetchUserOnce();
        }

        const room = await getRoomById(roomId as string);
        if (!isMounted) return;

        if (!room) {
          navigate("/");
          return;
        }

        setParticipants(room.users || []);
        setFinishedParticipants(room.finished_participants || []);

        if (
          currentUserId &&
          room.finished_participants
            ?.map((u: User) => u.id)
            .includes(currentUserId)
        ) {
          setHasSubmitted(true);
        }

        if (room.theme) {
          setTheme(room.theme);
          setShowThemeModal(false);
        }

        if (room.theme && room.writing_start_time) {
          const startTime = new Date(room.writing_start_time).getTime();
          const currentTime = new Date().getTime();
          const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
          const remaining = Math.max(0, WRITING_DURATION - elapsedSeconds);

          setTimeLeft(remaining);
        }

        // if all participants have finished, go to vote
        if (
          room.users &&
          room.finished_participants &&
          room.users.length > 0 &&
          room.finished_participants.length >= room.users.length
        ) {
          navigate(`/rooms/${roomId}/story/vote`);
        }
      } catch (error) {
        console.error("Error loading room data:", error);
      }
    };

    loadRoomData();

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
          if (!isMounted) return;

          console.log("Room updated:", payload.new);

          if (payload.new.theme) {
            setTheme(payload.new.theme);
            setShowThemeModal(false);

            if (payload.new.writing_start_time) {
              const startTime = new Date(
                payload.new.writing_start_time
              ).getTime();
              const currentTime = new Date().getTime();
              const elapsedSeconds = Math.floor(
                (currentTime - startTime) / 1000
              );
              const remaining = Math.max(0, WRITING_DURATION - elapsedSeconds);

              setTimeLeft(remaining);
            }
          }

          setParticipants(payload.new.users || []);
          setFinishedParticipants(payload.new.finished_participants || []);

          if (
            currentUserId &&
            payload.new.finished_participants
              ?.map((u: User) => u.id)
              .includes(currentUserId)
          ) {
            setHasSubmitted(true);
          }

          // check if all participants have submitted - ONLY navigate if not already in voting
          if (
            payload.new.users &&
            payload.new.finished_participants &&
            payload.new.users.length > 0 &&
            payload.new.finished_participants.length >=
              payload.new.users.length &&
            payload.new.stage !== "VOTING"
          ) {
            // change room stage to VOTING - but avoid triggering the update if we're already doing it elsewhere
            client
              .from("rooms")
              .update({ stage: "VOTING" })
              .eq("id", roomId)
              .then(() => {
                navigate(`/rooms/${roomId}/story/vote`);
              });
          }

          // if room stage changed to VOTING, navigate to votes
          if (payload.new.stage === "VOTING") {
            navigate(`/rooms/${roomId}/story/vote`);
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [roomId]);

  useEffect(() => {
    if (!theme) {
      selectRandomTheme();
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formattedTime = format(new Date(0, 0, 0, 0, 0, timeLeft), "mm:ss");

  return (
    <Container>
      <Modal
        isOpen={showThemeModal}
        onClose={() => {}}
        title="Escolhendo um tema..."
        description="Aguarde enquanto escolhemos um tema aleatório para a história"
        confirmLabel="Selecionar tema"
        showConfirmButton={false}
        showCloseButton={false}
      />

      <CardsContainer>
        <CardHeader>
          <TitleContainer>
            <CardTitle>Tema: {theme}</CardTitle>
          </TitleContainer>
        </CardHeader>
        <InfoContainer>
          <Timer>
            <span>{formattedTime}</span>
            <Clock size={16} />
          </Timer>
          <CharacterCounterContainer>
            <CharacterCounterText>
              <CharacterLimitText>
                {content.length} / {limit} caracteres
              </CharacterLimitText>
            </CharacterCounterText>
            <CircularProgress>
              <CircleBackground />
              <CircleProgress percentage={percentage} />
              <CircleCenter />
            </CircularProgress>
          </CharacterCounterContainer>
        </InfoContainer>
        <EditorContainer>
          <Editor
            editor={editor}
            placeholder="Comece sua história aqui..."
            disabled={hasSubmitted}
          />
        </EditorContainer>
        <Footer>
          {hasSubmitted ? (
            <div style={{ textAlign: "center", width: "100%" }}>
              <p>
                Aguardando outros participantes finalizarem... (
                {finishedParticipants.length}/{participants.length})
              </p>
            </div>
          ) : (
            <ConfirmButton onClick={handleSubmit} disabled={timeLeft <= 0}>
              Terminar
              <CircleCheck size={17} />
            </ConfirmButton>
          )}
        </Footer>
      </CardsContainer>
    </Container>
  );
}
