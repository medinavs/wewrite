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
import { useNavigate } from "react-router-dom";

interface StoryProps {
  id: number;
  author: string;
  content: string;
}

export function Result() {
  const [story, setStory] = useState<StoryProps>({
    id: 1,
    author: "Murilo",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, quos minima. Enim commodi at quia consequuntur cumque recusandae sit fuga labore eos impedit ducimus sunt nemo, sed pariatur soluta debitis.",
  });

  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 15000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: story.content,
    editable: false,
  });

  return (
    <Container>
      <Confetti width={width - 20} height={height - 20} gravity={0.05} />
      <CardContainer>
        <CardHeader>
          <CardTitle>Vencedor - {story.author}</CardTitle>
        </CardHeader>
        <CardContent>
          <Editor editor={editor} />
        </CardContent>
      </CardContainer>
    </Container>
  );
}
