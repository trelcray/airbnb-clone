import { Metadata } from "next";

import getCurrentUser from "@/actions/get-current-user";
import { getListingsById } from "@/actions/get-listing-by-id";
import getReservations from "@/actions/get-reservations";
import { EmptyState } from "@/components/ui/empty-state";

import { ListingClient } from "./listing-client";

interface IListingParams {
  listingId?: string;
}

export async function generateMetadata({
  params,
}: {
  params: IListingParams;
}): Promise<Metadata> {
  try {
    const listing = await getListingsById(params);
    if (!listing)
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };
    return {
      title: listing.title,
      description: listing.description,
      alternates: {
        canonical: `/listings/${listing.id}`,
      },
      twitter: {
        card: "summary_large_image",
        title: listing.title,
        description: listing.description,
        creator: "@ThalisZambarda",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
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
