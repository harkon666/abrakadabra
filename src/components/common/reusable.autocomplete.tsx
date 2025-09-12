import { X } from "lucide-react";
import { AutoComplete, type Option } from "../ui/autocomplete";

export const ReusableAutocomplete = ({
  options,
  value,
  setValue,
  loading,
}: {
  options: Option[];
  value: Option;
  setValue: (value: Option) => void;
  loading?: boolean;
}) => {
  return (
    <div className="flex items-center w-full relative">
      <AutoComplete
        options={options}
        isLoading={loading}
        value={value}
        emptyMessage="No results."
        onValueChange={setValue}
      />
      {value.label && (
        <X
          onClick={() => {
            setValue({ value: "", label: "" });
          }}
          size={14}
          className="absolute right-2 top-3 cursor-pointer"
        />
      )}
    </div>
  );
};
