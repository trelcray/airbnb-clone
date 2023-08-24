"use client";

import { useCallback, useMemo } from "react";

import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { HeartButton } from "@/components/heart-button";
import { Button } from "@/components/ui/button";
import { useCountries } from "@/hooks/use-countries";
import { SafeListing, SafeUser, safeReservations } from "@/types";

interface IListingCardProps {
  data: SafeListing;
  reservation?: safeReservations;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

export const ListingCard: React.FC<IListingCardProps> = ({
  data,
  actionId = "",
  actionLabel,
  currentUser,
  disabled,
  onAction,
  reservation,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, disabled, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "pp")} - ${format(end, "pp")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <figure
          className="relative aspect-square w-full overflow-hidden 
          rounded-xl"
        >
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="h-full w-full object-cover transition group-hover:scale-110"
          />
          <div className="absolute right-3 top-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </figure>
        <span className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </span>
        <span className="font-light text-neutral-500">
          {reservationDate || data.category}
        </span>
        <div className="flex flex-row items-center gap-1">
          <span className="font-semibold">$ {price}</span>
          {!reservation && <span className="font-light">night</span>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            isLoading={disabled}
            size="sm"
            onClick={handleCancel}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
