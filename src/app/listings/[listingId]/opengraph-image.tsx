/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

import { getListingsById } from "@/actions/get-listing-by-id";
import getRelativeDate from "@/actions/get-relative-date";

interface IListingParams {
  listingId?: string;
}

export const alt = "Listings | Airbnb Clone";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/*";

export default async function Image({ params }: { params: IListingParams }) {
  const listings = await getListingsById(params);

  return new ImageResponse(
    (
      <div tw="relative flex h-full w-full items-center justify-center">
        {/* Background */}
        <div tw="absolute inset-0 flex">
          <img
            width={1200}
            height={630}
            tw="flex flex-1"
            src={`${listings?.imageSrc}?w=1200&h=630&auto=format&q=75`}
            alt={listings?.title}
          />
          {/* Overlay */}
          <div tw="absolute inset-0 flex bg-black/50" />
        </div>
        <div tw="flex flex-col text-neutral-50">
          {/* Title */}
          <div tw="flex text-7xl font-bold">
            {listings?.title} - {listings?.locationValue}
          </div>
          {/* Tags */}
          <div
            tw="mt-6 flex flex-wrap items-center text-4xl 
            text-neutral-200"
          >
            <div
              tw={`font-medium ${
                listings?.category === "Beach" ||
                listings?.category === "Pools" ||
                listings?.category === "Lake"
                  ? "text-indigo-600"
                  : "text-emerald-600"
              }`}
            >
              {listings?.category}
            </div>
            <div tw="mx-6 h-4 w-4 rounded-full bg-neutral-300 " />
            <div>{listings?.user.name}</div>
            <div tw="mx-6 h-4 w-4 rounded-full bg-neutral-300" />
            <div>{getRelativeDate(listings?.createdAt ?? "")}</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
