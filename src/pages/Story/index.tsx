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
import { useState } from "react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

export function Story() {
  const [content, setContent] = useState("");
  const limit = 250;

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

  return (
    <Container>
      <CardsContainer>
        <CardHeader>
          <TitleContainer>
            <CardTitle>Tema: Joao Bananao e o pe de feijao</CardTitle>
          </TitleContainer>
        </CardHeader>
        <InfoContainer>
          <Timer>
            <span>1:32</span>
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
          <Editor editor={editor} placeholder="Comece sua história aqui..." />
        </EditorContainer>
        <Footer>
          <ConfirmButton>
            Terminar
            <CircleCheck size={17} />
          </ConfirmButton>
        </Footer>
      </CardsContainer>
    </Container>
  );
}
