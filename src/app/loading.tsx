import { CardPrivate } from "@/components/skeleton/card-private";
import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container>
      <div
        className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 
      lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        <CardPrivate />
        <CardPrivate />
        <CardPrivate />
      </div>
    </Container>
  );
}
