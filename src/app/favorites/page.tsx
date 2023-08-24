import { Metadata } from "next";

import getCurrentUser from "@/actions/get-current-user";
import { getFavoriteListings } from "@/actions/get-favorite-listings";
import { EmptyState } from "@/components/ui/empty-state";

import { FavoritesClient } from "./favorites-client";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Your favorites airbnb",
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

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
