"use client";

import Select from "react-select";

import { useCountries } from "@/hooks/use-countries";

export interface ICountrySelectValueProps {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface CountrySelectProps {
  value?: ICountrySelectValueProps;
  onChange: (value: ICountrySelectValueProps) => void;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
}) => {
  const { getAll } = useCountries();

  return (
    <Select
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as ICountrySelectValueProps)}
      formatOptionLabel={(option: ICountrySelectValueProps) => (
        <div className="flex flex-row items-center gap-3">
          <figure>{option.flag}</figure>
          <p>
            {option.label},
            <span className="ml-1 text-neutral-500">{option.region}</span>
          </p>
        </div>
      )}
      classNames={{
        control: () => "p-3 border-2",
        input: () => "text-lg",
        option: () => "text-lg",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "black",
          primary25: "#ffe4e6",
        },
      })}
    />
  );
};
