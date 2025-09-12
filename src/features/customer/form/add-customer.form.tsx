import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ReusableFormField } from "@/components/common/form.field";
import { useAddCustomerMutation } from "@/services/queries/customer";
import type { AddCustomerRequest } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { ToastSuccess } from "@/utils/toast";
import type { Dispatch } from "react";
import { cn } from "@/lib/utils";
import { gColorWhBg, rColorWhBg } from "@/utils/color";

export const customerFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required!",
  }),
  email: z
    .string()
    .min(2, {
      message: "Email is required!",
    })
    .email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
  city: z.string().min(2, {
    message: "City is required!",
  }),
  zipCode: z.string().min(4, { message: "Zip Code is required!" }),
  address: z.string().min(2, {
    message: "Address is required!",
  }),
  address2: z.string().optional(),
  fax: z
    .string()
    .regex(/^\d+$/, { message: "Fax number must contain only digits." }),
});

export const AddCustomerForm = ({
  setOpen,
}: {
  setOpen: Dispatch<boolean>;
}) => {
  const nav = useNavigate({ from: "/customer" });
  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      zipCode: "",
      address: "",
      address2: "",
      fax: "",
    },
  });

  const { mutate, isPending } = useAddCustomerMutation();

  function onSubmit(values: z.infer<typeof customerFormSchema>) {
    mutate(
      {
        ...values,
        ["password"]: values.phone.substring(0, 6),
      } as AddCustomerRequest,
      {
        onSuccess: ({ message }) => {
          setOpen(false);
          nav({
            to: "/customer",
            search: {
              page: 1,
              limit: 20,
            },
          });
          ToastSuccess(message);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 items-start">
          <ReusableFormField form={form} name="name" title="Name" />
          <ReusableFormField form={form} name="email" title="Email" />
          <ReusableFormField form={form} name="phone" title="Phone Number" />
          <ReusableFormField form={form} name="city" title="City" />
          <ReusableFormField form={form} name="zipCode" title="Zip Code" />
          <ReusableFormField form={form} name="fax" title="Fax" />
          <ReusableFormField form={form} name="address" title="Address" />
          <ReusableFormField form={form} name="address2" title="Address 2" />
        </div>
        <div className="flex gap-2 w-fit ml-auto">
          <Button
            type="reset"
            onClick={() => form.reset()}
            className={cn("text-white text-xs", rColorWhBg)}
          >
            Reset
          </Button>
          <Button
            type="submit"
            className={cn("text-white text-xs", gColorWhBg)}
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
