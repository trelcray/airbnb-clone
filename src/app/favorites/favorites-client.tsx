import { ListingCard } from "@/components/listings/listing-card";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import { SafeListing, SafeUser } from "@/types";

interface IFavoritesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

export const FavoritesClient: React.FC<IFavoritesClientProps> = ({
  currentUser,
  listings,
}) => {
  return (
    <Container>
      <Heading
        title="favorites"
        subtitle="List of places you have favorited!"
      />
      <div
        className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
