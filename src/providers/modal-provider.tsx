"use client";

import { LoginModal } from "@/components/modals/login-modal";
import { RegisterModal } from "@/components/modals/register-modal";
import { RentModal } from "@/components/modals/rent-modal";
import { SearchModal } from "@/components/modals/search-modal";

export const ModalProvider = () => {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <SearchModal />
      <RentModal />
    </>
  );
};
