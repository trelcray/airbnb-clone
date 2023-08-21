import getCurrentUser from "@/actions/get-current-user";
import getReservations from "@/actions/get-reservations";
import { EmptyState } from "@/components/ui/empty-state";

import { ReservationClient } from "./reservation-client";

export default async function Reservation() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties!"
      />
    );
  }

  return (
    <ReservationClient reservations={reservations} currentUser={currentUser} />
  );
}
