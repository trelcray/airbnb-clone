import { Categories } from "@/components/categories/categories";
import { Logo } from "@/components/logo";
import { Search } from "@/components/search";
import { Container } from "@/components/ui/container";
import { UserMenu } from "@/components/user-menu";
import { SafeUser } from "@/types";

interface INavbarProps {
  currentUser?: SafeUser | null;
}

export const Navbar: React.FC<INavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div
            className="flex flex-row items-center justify-between gap-3 
            md:gap-0"
          >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};
