import { AvatarFallback, AvatarImage, AvatarRoot, Button, Container } from "./styles";

interface ProfileAvatarProps {
    size: "sm" | "lg";
}

export function ProfileAvatar({ size }: ProfileAvatarProps) {
    return (
        <Container>
            <Button size={size}>
                <AvatarRoot>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" size={size} />
                    <AvatarFallback size={size} />
                </AvatarRoot>
            </Button>
        </Container>
    )
}