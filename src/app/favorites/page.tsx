import getCurrentUser from "@/actions/get-current-user";
import { getFavoriteListings } from "@/actions/get-favorite-listings";
import { EmptyState } from "@/components/ui/empty-state";

import { FavoritesClient } from "./favorites-client";

export default async function Favorites() {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorites listings!"
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
}
