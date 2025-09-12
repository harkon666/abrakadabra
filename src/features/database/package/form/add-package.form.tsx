import { ReusableFormField } from "@/components/common/form.field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppDispatch } from "@/lib/store";
import { setDialogAddPackage } from "@/reducers/database";
import { AddPackageSchema } from "@/schemas/database.schema";
import { useAddPackageMutation } from "@/services/queries/database/package";
import { ToastSuccess } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const AddPackageForm = () => {
  const form = useForm<z.infer<typeof AddPackageSchema>>({
    resolver: zodResolver(AddPackageSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });

  const nav = useNavigate({ from: "/database/package" });
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useAddPackageMutation();

  function onSubmit(values: z.infer<typeof AddPackageSchema>) {
    const payload = {
      name: values.name,
      price: Number(values.price.replaceAll(".", "")),
    };

    mutate(payload, {
      onSuccess: ({ message }) => {
        dispatch(setDialogAddPackage(false));
        nav({ to: "/database/package", search: { page: 1, limit: 20 } });
        ToastSuccess(message);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 items-start">
          <ReusableFormField form={form} name="name" title="Name" />
          <ReusableFormField
            form={form}
            name="price"
            title="Price"
            type="number"
          />
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
