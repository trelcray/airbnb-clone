"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

interface IEmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export const EmptyState: React.FC<IEmptyStateProps> = ({
  showReset,
  subtitle = "Try changing or removing some of your filters.",
  title = "No exact matches",
}) => {
  const router = useRouter();

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={subtitle} />
      <div className="mt-4 w-48">
        {showReset && (
          <Button variant="outline" onClick={() => router.push("/")}>
            Remove all Filters
          </Button>
        )}
      </div>
    </div>
  );
};
