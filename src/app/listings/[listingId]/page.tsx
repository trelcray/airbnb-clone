import getCurrentUser from "@/actions/get-current-user";
import { getListingsById } from "@/actions/get-listing-by-id";
import getReservations from "@/actions/get-reservations";
import { EmptyState } from "@/components/ui/empty-state";

import { ListingClient } from "./listing-client";

interface IListingParams {
  listingId?: string;
}

export default async function Listing({ params }: { params: IListingParams }) {
  const listing = await getListingsById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }
  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
}
