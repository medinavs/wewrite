import { AvatarFallback, AvatarImage, AvatarRoot, Button, Container } from "./styles";

export function ProfileAvatar() {
    return (
        <Container>
            <Button>
                <AvatarRoot>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                    <AvatarFallback />
                </AvatarRoot>
            </Button>
        </Container>
    )
}