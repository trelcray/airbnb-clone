"use client";

import { useCallback } from "react";
import { IconType } from "react-icons";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import { cn } from "@/lib/utils";

interface ICategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

export const CategoryBox: React.FC<ICategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: Record<string, string | string[] | undefined> = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2",
        "border-b-2 border-transparent p-3 text-neutral-500 transition",
        "hover:text-neutral-800",
        { "border-b-neutral-800 text-neutral-800": selected }
      )}
    >
      <Icon size={26} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};
