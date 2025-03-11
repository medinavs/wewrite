import { Clock, Users } from "lucide-react";
import { AvatarsContainer, Container, Content, Footer, Header, SubTitle, Text, Title, WritersCount } from "./styles";
import { ProfileAvatar } from "../Avatar";

export function Card() {
    return (
        <Container>
            <Header>
                <Title>Historia teste</Title>
                <SubTitle>
                    <Clock size={14} />
                    <span>2 hours ago</span>
                </SubTitle>
            </Header>
            <Content>
                <Text>Historinha legal pra encher linguiçasdkawdiawjdaowdjawdawidaw</Text>
            </Content>
            <Footer>
                <AvatarsContainer>
                    <ProfileAvatar />
                    <ProfileAvatar />
                </AvatarsContainer>
                <WritersCount>
                    <Users size={12} />
                    <span>2</span>
                </WritersCount>
            </Footer>
        </Container>
    )
}