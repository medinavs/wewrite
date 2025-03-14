import { Clock, Maximize2 } from "lucide-react";
import {
  AvatarsContainer,
  Container,
  Content,
  ExpandButton,
  Footer,
  Header,
  Text,
  Title,
  TitleContainer,
} from "./styles.ts";
import { ProfileAvatar } from "../Avatar/index.tsx";
import { LikeButton } from "../LikeButton/index.tsx";
import { StoryModal } from "../StoryModal/index.tsx";

interface StoryCardProps {
  story: {
    id: number;
    author: string;
    content: string;
  };
  isLiked: boolean;
  onLike: () => void;
}

export function StoryCard({ story, isLiked, onLike }: StoryCardProps) {
  return (
    <Container>
      <Header>
        <Title>{story.author}</Title>
        <StoryModal author={story.author} content={story.content}>
          <ExpandButton>
            <Maximize2 size={16} />
          </ExpandButton>
        </StoryModal>
      </Header>
      <Content>
        <Text>{story.content}</Text>
      </Content>
      <Footer>
        <AvatarsContainer>
          <ProfileAvatar size="sm" imageUrl={""} />
        </AvatarsContainer>
        <LikeButton event={onLike} initialLiked={isLiked} />
      </Footer>
    </Container>
  );
}
