"use client";

import { useCallback, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

import { ListingCard } from "@/components/listings/listing-card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { useToast } from "@/hooks/use-toast";
import { SafeListing, SafeUser } from "@/types";

interface IPropertiesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

export const PropertiesClient: React.FC<IPropertiesClientProps> = ({
  currentUser,
  listings,
}) => {
  const [deletingId, setDeletingId] = useState("");

  const router = useRouter();
  const { toast } = useToast();

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast({ title: "Listing deleted" });
          router.refresh();
        })
        .catch((error) => {
          toast({ title: error?.response?.data?.error, isError: true });
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [toast, router]
  );
  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties!" />
      <div
        className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
