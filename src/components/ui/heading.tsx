import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
}) => {
  return (
    <div className={cn("text-start", { "text-center": center })}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="mt-2 font-light text-neutral-500">{subtitle}</div>
    </div>
  );
};
