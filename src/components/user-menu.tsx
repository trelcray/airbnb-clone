"use client";

import { useCallback } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useLoginModal } from "@/hooks/use-login-modal";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { useRentModal } from "@/hooks/use-rent-modal";
import { SafeUser } from "@/types";

interface IUserMenuProps {
  currentUser?: SafeUser | null;
}

export const UserMenu: React.FC<IUserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div>
      <div className="flex items-center gap-3">
        <span
          onClick={onRent}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm 
          font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </span>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger
              className="flex cursor-pointer flex-row items-center 
              justify-between gap-3 rounded-full border-[1px] 
              border-neutral-200 p-4 transition hover:shadow-md md:px-2 
              md:py-1"
            >
              <GiHamburgerMenu className="h-4 w-4 text-slate-700" />
              <figure className="hidden md:block">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    height={30}
                    width={30}
                    alt="Avatar"
                    sizes="100vw"
                    src={currentUser?.image || "/images/placeholder.jpg"}
                  />
                  <AvatarFallback>
                    <Image
                      height={30}
                      width={30}
                      alt="Avatar"
                      sizes="100vw"
                      src="/images/placeholder.jpg"
                      className="animate-pulse"
                    />
                  </AvatarFallback>
                </Avatar>
              </figure>
            </MenubarTrigger>
            <MenubarContent
              align="end"
              className="top-12 w-[40vw] overflow-hidden rounded-xl 
            bg-white text-sm shadow-md md:w-full"
            >
              {currentUser ? (
                <>
                  <MenubarItem
                    onClick={() => router.push("/trips")}
                    className="cursor-pointer px-4 py-3 font-semibold transition
                    hover:bg-neutral-100"
                  >
                    My trips
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => router.push("/favorites")}
                    className="cursor-pointer px-4 py-3 font-semibold transition
                    hover:bg-neutral-100"
                  >
                    My favorites
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => router.push("/reservations")}
                    className="cursor-pointer px-4 py-3 font-semibold transition
                    hover:bg-neutral-100"
                  >
                    My Reservations
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => router.push("/properties")}
                    className="cursor-pointer px-4 py-3 font-semibold transition
                    hover:bg-neutral-100"
                  >
                    My Properties
                  </MenubarItem>
                  <MenubarItem
                    onClick={rentModal.onOpen}
                    className="cursor-pointer px-4 py-3 font-semibold transition
                    hover:bg-neutral-100"
                  >
                    Airbnb my home
                  </MenubarItem>
                  <hr />
                  <MenubarItem
                    onClick={() => signOut()}
                    className="cursor-pointer px-4 py-3 font-semibold transition
                    hover:bg-neutral-100"
                  >
                    Logout
                  </MenubarItem>
                </>
              ) : (
                <>
                  <MenubarItem
                    onClick={loginModal.onOpen}
                    className="cursor-pointer px-4 py-3 font-semibold transition
                    hover:bg-neutral-100"
                  >
                    Login
                  </MenubarItem>
                  <MenubarItem
                    onClick={registerModal.onOpen}
                    className="cursor-pointer px-4 py-3 font-semibold transition
                    hover:bg-neutral-100"
                  >
                    Sign up
                  </MenubarItem>
                </>
              )}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};
