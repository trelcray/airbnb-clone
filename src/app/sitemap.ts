import { MetadataRoute } from "next";

import { getListings } from "@/actions/get-listings";
import { siteConfig } from "@/config/site";
import { IListingParams } from "@/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await getListings("" as IListingParams);

  const listingsUrls =
    listings?.map((listing) => {
      return {
        url: `${siteConfig.url}/listings/${listing.id}`,
        lastModified: new Date(),
      };
    }) ?? [];

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
    ...listingsUrls,
    {
      url: `${siteConfig.url}/favorites`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/properties`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/reservations`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/trips`,
      lastModified: new Date(),
    },
  ];
}
