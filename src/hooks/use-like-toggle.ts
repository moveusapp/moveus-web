import { useCallback, useEffect, useRef, useState } from "react";
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
  // True only briefly after a deliberate like (not unlike, never on mount), so
  // the heart pop fires on the action and not when scrolling past liked items.
  const [justLiked, setJustLiked] = useState(false);
  const popTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(popTimer.current), []);

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
      setJustLiked(true);
      clearTimeout(popTimer.current);
      popTimer.current = setTimeout(() => setJustLiked(false), 320);
      like({ variables }).catch(() => {
        setLiked(false);
        setLikeCount((c) => c - 1);
      });
    }
  }, [liked, variables, like, unlike]);

  return { liked, likeCount, justLiked, toggle };
}
