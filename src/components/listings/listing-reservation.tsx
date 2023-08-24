"use client";

import { Range } from "react-date-range";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface IListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

export const ListingReservation: React.FC<IListingReservationProps> = ({
  dateRange,
  disabledDates,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
  disabled,
}) => {
  return (
    <div
      className="overflow-hidden rounded-xl border-[1px] border-neutral-200
     bg-white"
    >
      <div className="flex flex-row items-center gap-1 p-4">
        <span className="text-2xl font-semibold">$ {price}</span>
        <span className="font-light text-neutral-600">night</span>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button
          className="w-full"
          disabled={disabled}
          isLoading={disabled}
          onClick={onSubmit}
        >
          Reserve
        </Button>
      </div>
      <div
        className="flex flex-row items-center justify-between p-4 text-lg 
        font-semibold"
      >
        <span>Total</span>
        <span>$ {totalPrice}</span>
      </div>
    </div>
  );
};
