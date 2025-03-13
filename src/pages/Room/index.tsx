import { ArrowLeft, ArrowRight, Users } from "lucide-react";
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
import { ProfileAvatar } from "../../components/ui/Avatar";

export function Room() {
  return (
    <Container>
      <CardsContainer>
        <CardHeader>
          <TitleContainer>
            <CardTitle>Sala de espera</CardTitle>
            <WritersCount>
              <Users size={12} />
              <span>4 / 4</span>
            </WritersCount>
          </TitleContainer>
        </CardHeader>
        <ParticipantsContainer>
          <ParticipantContainer>
            <ProfileAvatar size={"lg"} />
            <ParticipantName>Murilao</ParticipantName>
          </ParticipantContainer>
          <ParticipantContainer>
            <ProfileAvatar size={"lg"} />
            <ParticipantName>Rosildo</ParticipantName>
          </ParticipantContainer>
          <ParticipantContainer>
            <ProfileAvatar size={"lg"} />
            <ParticipantName>Mandioco</ParticipantName>
          </ParticipantContainer>
          <ParticipantContainer>
            <ProfileAvatar size={"lg"} />
            <ParticipantName>mulekao</ParticipantName>
          </ParticipantContainer>
        </ParticipantsContainer>
        <Footer>
          <ExitButton>
            <ArrowLeft size={18} />
            Sair
          </ExitButton>
          <ConfirmButton>
            Começar
            <ArrowRight size={18} />
          </ConfirmButton>
        </Footer>
      </CardsContainer>
    </Container>
  );
}
