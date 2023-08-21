import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

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
    <div
      onClick={toggleFavorite}
      className="relative cursor-pointer transition hover:opacity-80"
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
    </div>
  );
};
