import { Clock, ThumbsDown, ThumbsUp } from "lucide-react";
import {
  CardHeader,
  CardsContainer,
  CardTitle,
  Container,
  Footer,
  EditorContainer,
  TitleContainer,
  Timer,
  Editor,
  VoteButtonsContainer,
  VoteButton,
  AuthorContainer,
} from "./styles";
import { useEditor } from "@tiptap/react";
import { useState } from "react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { ProfileAvatar } from "../../components/ui/Avatar";

export function Vote() {
  const [content, setContent] = useState("awdawdawd");

  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: content,
    editable: false,
  });

  const handleVote = (vote: "approve" | "reject") => {
    console.log(`Votou: ${vote}`);
  };

  return (
    <Container>
      <CardsContainer>
        <CardHeader>
          <TitleContainer>
            <AuthorContainer>
              <ProfileAvatar size="sm" />
              <CardTitle>- Murilao</CardTitle>
            </AuthorContainer>
            <Timer>
              <span>1:00</span>
              <Clock size={16} />
            </Timer>
          </TitleContainer>
        </CardHeader>
        <EditorContainer readonly>
          <Editor editor={editor} placeholder="Comece sua história aqui..." />
        </EditorContainer>
        <Footer>
          <VoteButtonsContainer>
            <VoteButton onClick={() => handleVote("reject")} variant="negative">
              <ThumbsDown size={16} />
              Rejeitar
            </VoteButton>
            <VoteButton
              onClick={() => handleVote("approve")}
              variant="positive"
            >
              Aprovar
              <ThumbsUp size={16} />
            </VoteButton>
          </VoteButtonsContainer>
        </Footer>
      </CardsContainer>
    </Container>
  );
}
