"use client";

import { useCallback, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

import { ListingCard } from "@/components/listings/listing-card";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import { useToast } from "@/hooks/use-toast";
import { SafeUser, safeReservations } from "@/types";

interface IReservationClientProps {
  reservations: safeReservations[];
  currentUser: SafeUser | null;
}

export const ReservationClient: React.FC<IReservationClientProps> = ({
  currentUser,
  reservations,
}) => {
  const [deletingId, setDeletingId] = useState("");

  const router = useRouter();
  const { toast } = useToast();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast({ title: "Reservation cancelled" });
          router.refresh();
        })
        .catch(() => {
          toast({ title: "Something went wrong", isError: true });
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [toast, router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div
        className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
