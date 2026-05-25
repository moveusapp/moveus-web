import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client/react";
import type { TypedDocumentNode } from "@apollo/client";

export function useLikeToggle<V extends Record<string, unknown>>({
  variables,
  initialLiked,
  initialCount,
  likeDoc,
  unlikeDoc,
}: {
  variables: V;
  initialLiked: boolean;
  initialCount: number;
  likeDoc: TypedDocumentNode<unknown, V>;
  unlikeDoc: TypedDocumentNode<unknown, V>;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);

  const [like] = useMutation(likeDoc);
  const [unlike] = useMutation(unlikeDoc);

  const toggle = useCallback(() => {
    if (liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
      unlike({ variables }).catch(() => {
        setLiked(true);
        setLikeCount((c) => c + 1);
      });
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
      like({ variables }).catch(() => {
        setLiked(false);
        setLikeCount((c) => c - 1);
      });
    }
  }, [liked, variables, like, unlike]);

  return { liked, likeCount, toggle };
}
