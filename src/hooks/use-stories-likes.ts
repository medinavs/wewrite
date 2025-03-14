import { useState } from "react";

export const useStoryLikes = () => {
  const [likedStoryId, setLikedStoryId] = useState<number | null>(null);

  const handleLike = (storyId: number) => {
    if (likedStoryId === storyId) {
      setLikedStoryId(null);
    } else {
      setLikedStoryId(storyId);
    }
  };

  const isStoryLiked = (storyId: number) => likedStoryId === storyId;

  return { handleLike, isStoryLiked };
};
