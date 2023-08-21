import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

export const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={cn(
        "flex cursor-pointer flex-col gap-3 rounded-xl border-2",
        "border-neutral-200 p-4 transition hover:border-black",
        { "border-black": selected }
      )}
    >
      <Icon size={30} />
      <span className="font-semibold">{label}</span>
    </div>
  );
};
