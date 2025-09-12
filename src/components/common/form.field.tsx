import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { formatIDR } from "@/utils/format";

type TFormField<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  type?: "text" | "number" | "password";
  loading?: boolean;
  title: string;
  placeholder?: string;
  description?: string;
};

const openEye = <Eye size={18} />;

const closeEye = <EyeOff size={18} />;

export const ReusableFormField = <T extends FieldValues>({
  form,
  name,
  title,
  loading = false,
  type = "text",
  placeholder = "",
  description = "",
}: TFormField<T>) => {
  const [flag, setFlag] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                className="w-full disabled:bg-muted/50"
                placeholder={placeholder}
                disabled={loading}
                {...field}
                onChange={(event) => {
                  let value: string | number = event.target.value;
                  if (type === "number") value = formatIDR(value);
                  field.onChange(value);
                }}
                autoFocus={false}
              />
              {type === "password" ? (
                <div
                  onClick={() => setFlag(!flag)}
                  className="absolute right-2 top-2.5 text-muted-foreground"
                >
                  {flag ? openEye : closeEye}
                </div>
              ) : null}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
