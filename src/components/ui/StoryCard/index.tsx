import { Maximize2 } from "lucide-react";
import {
  AvatarsContainer,
  Container,
  Content,
  ExpandButton,
  Footer,
  Header,
  Text,
  Title,
} from "./styles.ts";
import { ProfileAvatar } from "../Avatar/index.tsx";
import { LikeButton } from "../LikeButton/index.tsx";
import { StoryModal } from "../StoryModal/index.tsx";
import { User } from "../../../http/get-user.ts";

interface StoryCardProps {
  story: {
    id: string;
    author: string;
    content: string;
  };
  isLiked: boolean;
  voters: User[];
  onLike: () => void;
}

export function StoryCard({ story, isLiked, voters, onLike }: StoryCardProps) {
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
          {voters.map((voter, index) => (
            <ProfileAvatar
              key={index}
              size="sm"
              imageUrl={voter.avatar ?? ""}
            />
          ))}
        </AvatarsContainer>
        <LikeButton event={onLike} initialLiked={isLiked} />
      </Footer>
    </Container>
  );
}
