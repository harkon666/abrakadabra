import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { UseFormReturn } from "react-hook-form";
import { useEffect } from "react";

interface PregnantRadioProps {
  form: UseFormReturn<any>;
  name: string;
  disabled: boolean;
  label: string;
  loading?: boolean;
  msg?: string;
}

export function FieldPregnantRadio({
  form,
  label,
  name,
  disabled = false,
  loading = false,
}: PregnantRadioProps) {
  useEffect(() => {
    if (disabled) {
      form.setValue(name, "2");
    }
  }, [disabled, form, name]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value} // Use value instead of defaultValue for controlled component
              className="flex gap-8"
              disabled={loading || disabled}
            >
              <FormItem className="flex items-center space-x-1 space-y-0">
                <FormControl>
                  <RadioGroupItem disabled={disabled || loading} value={"1"} />
                </FormControl>
                <FormLabel className="font-normal">Yes</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-1 space-y-0">
                <FormControl>
                  <RadioGroupItem disabled={disabled || loading} value="2" />
                </FormControl>
                <FormLabel className="font-normal">No</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
