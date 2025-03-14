import { Clock, Users } from "lucide-react";
import {
  CardHeader,
  CardsContainer,
  CardTitle,
  Container,
  ParticipantsContainer,
  TitleContainer,
  WritersCount,
  Timer,
} from "./styles";
import { StoryCard } from "../../components/ui/StoryCard";
import { useStoryLikes } from "../../hooks/use-stories-likes";

const stories = [
  {
    id: 1,
    author: "Murilo",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, quos minima. Enim commodi at quia consequuntur cumque recusandae sit fuga labore eos impedit ducimus sunt nemo, sed pariatur soluta debitis.",
  },
  { id: 2, author: "Murilovski", content: "Conteúdo da história 2..." },
  { id: 3, author: "enne", content: "Conteúdo da história 3..." },
  { id: 4, author: "testedsa", content: "Conteúdo da história 4..." },
];

export function Votes() {
  const { handleLike, isStoryLiked } = useStoryLikes();

  return (
    <Container>
      <CardsContainer>
        <CardHeader>
          <TitleContainer>
            <CardTitle>Votação - Joao pé de feijao</CardTitle>
            <WritersCount>
              <Users size={12} />
              <span>4 / 4</span>
            </WritersCount>
          </TitleContainer>
          <Timer>
            <span>1:30</span>
            <Clock size={16} />
          </Timer>
        </CardHeader>
        <ParticipantsContainer>
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              isLiked={isStoryLiked(story.id)}
              onLike={() => handleLike(story.id)}
            />
          ))}
        </ParticipantsContainer>
      </CardsContainer>
    </Container>
  );
}
