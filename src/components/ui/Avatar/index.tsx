import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  Button,
  Container,
} from "./styles";

interface ProfileAvatarProps {
  size: "sm" | "lg";
  imageUrl: string;
}

export function ProfileAvatar({ size, imageUrl }: ProfileAvatarProps) {
  return (
    <Container>
      <Button size={size}>
        <AvatarRoot>
          <AvatarImage src={imageUrl} size={size} />
          <AvatarFallback size={size} />
        </AvatarRoot>
      </Button>
    </Container>
  );
}
