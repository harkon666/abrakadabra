import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AutoComplete, type Option } from "../ui/autocomplete";

type TFormField<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  title: string;
  options: Option[];
  description?: string;
  loading?: boolean;
};

export const ReusableAutocompleteFormField = <T extends FieldValues>({
  form,
  name,
  title,
  options,
  loading,
}: TFormField<T>) => {
  const watch = form.watch(name);

  const [value, setValue] = useState({ label: "", value: "" });

  useEffect(() => {
    if (!watch) {
      setValue({ label: "", value: "" });
      form.clearErrors(name);
    }
  }, [options, watch]);

  useEffect(() => {
    if (value.label) {
      form.setValue(name, value.value as never, { shouldValidate: true });
      form.clearErrors(name);
    } else {
      form.setValue(name, "" as never);
      setValue({ label: "", value: "" });
    }
  }, [value.label, value.value, name, form]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <div className="flex items-center w-full relative">
              <AutoComplete
                options={options}
                isLoading={loading}
                value={value}
                emptyMessage="No results."
                onValueChange={(e) => {
                  setValue(e);
                }}
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
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
