import { Users } from "lucide-react";
import {
  CardHeader,
  CardsContainer,
  CardTitle,
  Container,
  ParticipantsContainer,
  TitleContainer,
  WritersCount,
} from "./styles";
import { StoryCard } from "../../components/ui/StoryCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../../database/client";
import { getRoomById } from "../../http/get-rooms";
import { getUser, User } from "../../http/get-user";
import { showToast } from "../../components/ui/Toast";

type Story = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  room_id: string;
  author?: {
    name: string;
    avatar?: string;
  };
};

type Vote = {
  user_id: string;
  story_id: string;
};

export function Votes() {
  const [stories, setStories] = useState<Story[]>([]);
  const [theme, setTheme] = useState("");
  const [participants, setParticipants] = useState<User[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [currentUserVote, setCurrentUserVote] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();

  const handleVote = async (storyId: string) => {
    try {
      const user = await getUser();
      if (!user) return;

      setCurrentUserId(user.id);

      const room = await getRoomById(roomId as string);
      if (!room) return;

      let updatedVotes = Array.isArray(room.votes) ? [...room.votes] : [];

      const existingVote = updatedVotes.find(
        (vote) => vote.user_id === user.id && vote.story_id === storyId
      );

      if (existingVote) {
        // user clicked on story they already voted for - remove vote (dislike)
        updatedVotes = updatedVotes.filter(
          (vote) => !(vote.user_id === user.id && vote.story_id === storyId)
        );

        await client
          .from("rooms")
          .update({ votes: updatedVotes })
          .eq("id", roomId);

        setCurrentUserVote(null);
        setVotes(updatedVotes);

        showToast({
          message: "Voto removido!",
          type: "info",
          position: "bottom-right",
        });
      } else {
        // user is voting for a new story

        // first remove any existing vote by this user
        updatedVotes = updatedVotes.filter((vote) => vote.user_id !== user.id);

        const newVote = {
          user_id: user.id,
          story_id: storyId,
        };
        updatedVotes.push(newVote);

        await client
          .from("rooms")
          .update({ votes: updatedVotes })
          .eq("id", roomId);

        setCurrentUserVote(storyId);
        setVotes(updatedVotes);

        showToast({
          message: "Voto registrado com sucesso!",
          type: "success",
          position: "bottom-right",
        });
      }

      if (
        room.users &&
        Array.isArray(room.users) &&
        updatedVotes.length === room.users.length &&
        room.stage !== "RESULTS"
      ) {
        // move to results page if everyone has voted
        await client
          .from("rooms")
          .update({ stage: "RESULTS" })
          .eq("id", roomId);

        navigate(`/rooms/${roomId}/results`);
      }
    } catch (error) {
      console.error("Error updating vote:", error);
      showToast({
        message: "Erro ao atualizar voto",
        type: "error",
        position: "bottom-right",
      });
    }
  };

  const isStoryVoted = (storyId: string) => {
    return currentUserVote === storyId;
  };

  const getVotersForStory = (storyId: string) => {
    return votes
      .filter((vote) => vote.story_id === storyId)
      .map((vote) => participants.find((p) => p.id === vote.user_id))
      .filter(Boolean) as User[];
  };

  useEffect(() => {
    const initializeVoting = async () => {
      if (!roomId) return;

      try {
        const user = await getUser();
        if (user) {
          setCurrentUserId(user.id);
        }

        const room = await getRoomById(roomId as string);
        if (!room) {
          navigate("/");
          return;
        }

        if (!room.vote_start_time) {
          // set voting start time
          await client
            .from("rooms")
            .update({
              vote_start_time: new Date(),
              votes: [],
            })
            .eq("id", roomId);
        } else {
          // load existing votes
          setVotes(Array.isArray(room.votes) ? room.votes : []);

          if (user) {
            const userVote = Array.isArray(room.votes)
              ? room.votes.find((vote: Vote) => vote.user_id === user.id)
              : undefined;
            if (userVote) {
              setCurrentUserVote(userVote.story_id);
            }
          }
        }

        setTheme(room.theme || "");
        setParticipants(room.users || []);

        if (
          room.votes &&
          room.users &&
          Array.isArray(room.votes) &&
          Array.isArray(room.users) &&
          room.votes.length === room.users.length &&
          room.stage !== "RESULTS"
        ) {
          await client
            .from("rooms")
            .update({ stage: "RESULTS" })
            .eq("id", roomId);

          navigate(`/rooms/${roomId}/results`);
        }

        const { data: storiesData, error } = await client
          .from("stories")
          .select("*")
          .eq("room_id", roomId);

        if (error) {
          throw error;
        }

        const storiesWithAuthor = await Promise.all(
          storiesData.map(async (story) => {
            const author = room.users?.find(
              (user) => user.id === story.user_id
            );
            return {
              ...story,
              author: author
                ? {
                    name: author.name,
                    avatar: author.avatar,
                  }
                : undefined,
            };
          })
        );

        setStories(storiesWithAuthor);
      } catch (error) {
        console.error("Error initializing voting:", error);
      }
    };

    initializeVoting();
  }, [roomId, navigate]);

  useEffect(() => {
    if (!roomId) return;

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
          console.log("Room updated:", payload.new);

          setParticipants(payload.new.users || []);

          setVotes(Array.isArray(payload.new.votes) ? payload.new.votes : []);

          if (currentUserId) {
            const userVote = payload.new.votes?.find(
              (vote: Vote) => vote.user_id === currentUserId
            );
            if (userVote) {
              setCurrentUserVote(userVote.story_id);
            }
          }

          if (
            (payload.new.votes &&
              payload.new.users &&
              payload.new.votes.length >= payload.new.users.length) ||
            payload.new.stage === "RESULTS"
          ) {
            navigate(`/rooms/${roomId}/story/result`);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId, navigate, currentUserId]);

  return (
    <Container>
      <CardsContainer>
        <CardHeader>
          <TitleContainer>
            <CardTitle>Votação - {theme}</CardTitle>
            <WritersCount>
              <Users size={12} />
              <span>
                Votos: {votes.length} / {participants.length}
              </span>
            </WritersCount>
          </TitleContainer>
        </CardHeader>
        <ParticipantsContainer>
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={{
                id: story.id,
                author: story.author?.name || "Anônimo",
                content: story.content,
              }}
              isLiked={isStoryVoted(story.id)}
              onLike={() => handleVote(story.id)}
              voters={getVotersForStory(story.id)}
            />
          ))}
        </ParticipantsContainer>
      </CardsContainer>
    </Container>
  );
}
