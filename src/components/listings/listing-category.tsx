import { IconType } from "react-icons";

interface IListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

export const ListingCategory: React.FC<IListingCategoryProps> = ({
  description,
  icon: Icon,
  label,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{label}</span>
          <p className="font-light text-neutral-500">{description}</p>
        </div>
      </div>
    </div>
  );
};
