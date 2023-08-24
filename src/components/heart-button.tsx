import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import { useFavorite } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { SafeUser } from "@/types";

interface IHeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

export const HeartButton: React.FC<IHeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <Button
      onClick={toggleFavorite}
      size="none"
      variant="ghost"
      className="relative transition hover:bg-transparent hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-2px -top-2px fill-white"
      />
      <AiFillHeart
        size={24}
        className={cn("fill-neutral-500/70", {
          "fill-rose-500": hasFavorited,
        })}
      />
    </Button>
  );
};
