import { Metadata } from "next";

import getCurrentUser from "@/actions/get-current-user";
import getReservations from "@/actions/get-reservations";
import { EmptyState } from "@/components/ui/empty-state";

import { TripsClient } from "./trips-client";

export const metadata: Metadata = {
  title: "Trips",
  description: "Your trips airbnb",
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

export default async function Trips() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserved any trips"
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
}
