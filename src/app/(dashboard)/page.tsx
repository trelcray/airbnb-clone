import getCurrentUser from "@/actions/get-current-user";
import { getListings } from "@/actions/get-listings";
import { ListingCard } from "@/components/listings/listing-card";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { IListingParams } from "@/types";

//https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-dynamic";

interface IHomeProps {
  searchParams: IListingParams;
}

export default async function Home({ searchParams }: IHomeProps) {
  const listigns = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listigns.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div
        className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        {listigns.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
}
