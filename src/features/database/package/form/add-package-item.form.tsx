import { ReusableFormField } from "@/components/common/form.field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppDispatch } from "@/lib/store";
import { setDialogAddPackageItem } from "@/reducers/database";
import { AddPackageItemSchema } from "@/schemas/database.schema";
import { useAddPackageItemMutation } from "@/services/queries/database/package";
import { ToastSuccess } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PackageAutocompleteFormField } from "../autocomplete/package.autocomplete";

export const AddPackageItemForm = () => {
  const form = useForm<z.infer<typeof AddPackageItemSchema>>({
    resolver: zodResolver(AddPackageItemSchema),
    defaultValues: {
      name: "",
    },
  });

  const nav = useNavigate({ from: "/database/package" });
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useAddPackageItemMutation();

  function onSubmit(values: z.infer<typeof AddPackageItemSchema>) {
    const payload = {
      packageId: values.packageId,
      name: values.name,
    };

    mutate(payload, {
      onSuccess: ({ message }) => {
        dispatch(setDialogAddPackageItem(false));
        nav({ to: "/database/package", search: { page: 1, limit: 20 } });
        ToastSuccess(message);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 items-start">
          <PackageAutocompleteFormField form={form} />
          <ReusableFormField form={form} name="name" title="Name" />
        </div>
        <div className="flex gap-2 w-fit ml-auto">
          <Button
            disabled={isPending}
            type="reset"
            onClick={() => form.reset()}
            className="bg-red-500/80 hover:bg-red-500 hover:cursor-pointer text-white text-xs"
            size={"sm"}
          >
            Reset
          </Button>
          <Button
            disabled={isPending}
            type="submit"
            className="bg-green-500/80 hover:bg-green-500 hover:cursor-pointer text-white text-xs"
            size={"sm"}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
