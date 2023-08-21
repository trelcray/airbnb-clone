"use client";

import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        isError = false,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="flex gap-1">
                  {!isError ? (
                    <IoMdCheckmarkCircle
                      size={20}
                      className="mt-[0.05rem] text-emerald-500"
                    />
                  ) : (
                    <IoMdCloseCircle
                      size={20}
                      className="mt-[0.05rem] text-rose-500"
                    />
                  )}
                  <p className="font-semibold">{title}</p>
                </ToastTitle>
              )}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
