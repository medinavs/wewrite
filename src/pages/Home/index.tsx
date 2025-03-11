import { CirclePlus, Globe } from "lucide-react";
import { CardsContainer, Container, Section, CardHeader, SubTitle, Title, CardTitle, NewStoryButton, StoriesContainer, TabListContainer, TabTrigger, StoryCardsContainer, StorysGrid } from "./styles";
import { Tabs } from "radix-ui";
import { Card } from "../../components/ui/Card";

export function Home() {
    return (
        <Container>
            <title>Home | WeWrite</title>
            <Section>
                <Title>Welcome to WeWrite</Title>
                <SubTitle>Create and collaborate on stories one line at a time. Join the fun and let your creativity flow!</SubTitle>
            </Section>
            <CardsContainer>
                <CardHeader>
                    <CardTitle>Stories</CardTitle>
                    <NewStoryButton>
                        <CirclePlus />
                        Start New Story
                    </NewStoryButton>
                </CardHeader>
                <StoriesContainer>
                    <Tabs.Root defaultValue="all">
                        <TabListContainer>
                            <TabTrigger value="all">
                                <Globe size={16} />
                                All
                            </TabTrigger>
                            <TabTrigger value="private">New</TabTrigger>
                            <TabTrigger value="myStories">Following</TabTrigger>
                        </TabListContainer>
                        <Tabs.Content value="all">
                            <StoryCardsContainer>
                                <StorysGrid>
                                    <Card />
                                    <Card />
                                    <Card />
                                </StorysGrid>
                            </StoryCardsContainer>
                        </Tabs.Content>
                        <Tabs.Content value="private">
                            New stories
                        </Tabs.Content>
                        <Tabs.Content value="myStories">
                            Following stories
                        </Tabs.Content>
                    </Tabs.Root>
                </StoriesContainer>
            </CardsContainer>
        </Container>
    )
}