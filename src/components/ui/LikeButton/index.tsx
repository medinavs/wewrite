import Lottie from "react-lottie";
import { useEffect, useState } from "react";
import animationData from "./animation.json";
import { Button } from "./styles";

interface LikeButtonProps {
  event: () => void;
  initialLiked?: boolean;
}

export function LikeButton({ event, initialLiked = false }: LikeButtonProps) {
  const [isLiked, setLikeState] = useState(false);
  const [animationState, setAnimationState] = useState({
    isStopped: true,
    isPaused: false,
    direction: initialLiked ? 1 : -1,
  });

  useEffect(() => {
    if (initialLiked !== isLiked) {
      setLikeState(initialLiked);
      setAnimationState({
        ...animationState,
        isStopped: false,
        direction: initialLiked ? 1 : -1,
      });
    }
  }, [initialLiked]);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Button
      onClick={() => {
        const reverseAnimation = -1;
        const normalAnimation = 1;

        setAnimationState({
          ...animationState,
          isStopped: false,
          direction:
            animationState.direction === normalAnimation
              ? reverseAnimation
              : normalAnimation,
        });
        setLikeState(!isLiked);
        event();
      }}
    >
      <Lottie
        options={defaultOptions}
        width={80}
        height={80}
        direction={animationState.direction}
        isStopped={animationState.isStopped}
        isPaused={animationState.isPaused}
      />
    </Button>
  );
}
