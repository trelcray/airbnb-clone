"use client";

import { IconType } from "react-icons";

import dynamic from "next/dynamic";
import Image from "next/image";

import { ListingCategory } from "@/components/listings/listing-category";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCountries } from "@/hooks/use-countries";
import { SafeUser } from "@/types";

const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});

interface IListingInfoProps {
  user: SafeUser | null;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

export const ListingInfo: React.FC<IListingInfoProps> = ({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <p>Hosted by {user?.name}</p>
          <Avatar className="h-8 w-8">
            <AvatarImage
              height={30}
              width={30}
              alt="Avatar"
              sizes="100vw"
              src={user?.image || "/images/placeholder.jpg"}
            />
            <AvatarFallback>
              <Image
                height={30}
                width={30}
                alt="Avatar"
                sizes="100vw"
                src="/images/placeholder.jpg"
                className="animate-pulse"
              />
            </AvatarFallback>
          </Avatar>
        </div>
        <div
          className="flex flex-row items-center gap-4 font-light
         text-neutral-500"
        >
          <span>{guestCount} guest</span>
          <span>{roomCount} rooms</span>
          <span>{bathroomCount} bathrooms</span>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <p className="text-lg font-light text-neutral-500">{description}</p>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};
