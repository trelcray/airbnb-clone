"use client";

import { useCallback } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "./button";

interface IModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children?: React.ReactNode;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

export const Modal: React.FC<IModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  onSubmit,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  return (
    <div>
      <Dialog modal open={isOpen} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader className="border-b">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="relative flex-auto px-6">{children}</div>
          <DialogFooter className="flex-col gap-2 p-6">
            <div className="flex w-full flex-row items-center gap-4">
              {secondaryAction && secondaryActionLabel && (
                <Button
                  className="w-full"
                  disabled={disabled}
                  onClick={handleSecondaryAction}
                  variant="outline"
                >
                  {secondaryActionLabel}
                </Button>
              )}
              <Button
                className="w-full"
                disabled={disabled}
                isLoading={disabled}
                onClick={handleSubmit}
              >
                {actionLabel}
              </Button>
            </div>
            {footer}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
