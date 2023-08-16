import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      alt="Logo"
      className="hidden h-9 w-auto cursor-pointer md:block"
      height={100}
      width={100}
      src="/images/logo.png"
    />
  );
};
