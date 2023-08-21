import Image from "next/image";

import { HeartButton } from "@/components/heart-button";
import Heading from "@/components/ui/heading";
import { useCountries } from "@/hooks/use-countries";
import { SafeUser } from "@/types";

interface IListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser: SafeUser | null;
}

export const ListingHead: React.FC<IListingHeadProps> = ({
  currentUser,
  id,
  imageSrc,
  locationValue,
  title,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <figure className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="w-full object-cover"
        />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </figure>
    </>
  );
};
