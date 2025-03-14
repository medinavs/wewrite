import { useEditor } from "@tiptap/react";
import {
  CardContainer,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  Editor,
} from "./styles";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "../../components/ui/Toast";
import { client } from "../../database/client";

interface StoryProps {
  id: number;
  author: string;
  content: string;
  votes: number;
}

export function Result() {
  const [story, setStory] = useState<StoryProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { width, height } = useWindowSize();

  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: "",
    editable: false,
  });

  useEffect(() => {
    const fetchWinningStory = async () => {
      try {
        if (!roomId) {
          navigate("/");
          return;
        }

        // room data to access votes
        const { data: roomData, error: roomError } = await client
          .from("rooms")
          .select("*")
          .eq("id", roomId)
          .single();

        if (roomError || !roomData) {
          throw new Error("Failed to fetch room data");
        }

        // count votes per story
        const voteCount: Record<string, number> = {};

        if (roomData.votes && Array.isArray(roomData.votes)) {
          roomData.votes.forEach((vote: { story_id: string }) => {
            voteCount[vote.story_id] = (voteCount[vote.story_id] || 0) + 1;
          });
        }

        //  story with most votes
        let maxVotes = 0;
        let winningStoryId = null;

        Object.entries(voteCount).forEach(([storyId, count]) => {
          if (count > maxVotes) {
            maxVotes = count;
            winningStoryId = storyId;
          }
        });

        if (!winningStoryId) {
          throw new Error("No votes found");
        }

        //  winning story details
        const { data: storyData, error: storyError } = await client
          .from("stories")
          .select("*")
          .eq("id", winningStoryId)
          .single();

        if (storyError || !storyData) {
          throw new Error("Failed to fetch story data");
        }

        // find author information
        const author = roomData.users?.find(
          (user: { id: string }) => user.id === storyData.user_id
        );

        setStory({
          id: storyData.id,
          author: author?.name || "Anônimo",
          content: storyData.content,
          votes: maxVotes,
        });
      } catch (error) {
        console.error("Error fetching winning story:", error);
        showToast({
          message: "Erro ao buscar a história vencedora",
          type: "error",
          position: "bottom-right",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWinningStory();

    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 25000);

    return () => clearTimeout(redirectTimer);
  }, [navigate, roomId]);

  useEffect(() => {
    if (editor && story?.content) {
      editor.commands.setContent(story.content);
    }
  }, [editor, story]);

  if (isLoading) {
    return (
      <Container>
        <CardContainer>
          <CardHeader>
            <CardTitle>Carregando resultado...</CardTitle>
          </CardHeader>
        </CardContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Confetti width={width - 20} height={height - 20} gravity={0.05} />
      <CardContainer>
        <CardHeader>
          <CardTitle>
            Vencedor - {story?.author}
            {story?.votes && <span> ({story.votes} votos)</span>}
          </CardTitle>{" "}
        </CardHeader>
        <CardContent>
          <Editor editor={editor} />
        </CardContent>
      </CardContainer>
    </Container>
  );
}
