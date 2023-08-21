import { useCallback, useMemo } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

import { useLoginModal } from "@/hooks/use-login-modal";
import { SafeUser } from "@/types";

import { useToast } from "./use-toast";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const { toast } = useToast();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast({ title: "success" });
      } catch (error) {
        toast({ title: "Something went wrong.", isError: true });
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router, toast]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};
