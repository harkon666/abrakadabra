import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ReusableFormField } from "@/components/common/form.field";
import { useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import { FieldGenderRadio } from "@/components/common/gender.field";
import { patientFormSchema } from "@/schemas/patient.schema";
import { InputDateField } from "@/components/common/input-date.field";
import { dateValidation } from "@/utils/date-validation";
import { useAddPatientMutation } from "@/services/queries/patient";
import { ToastSuccess } from "@/utils/toast";
import { useNavigate } from "@tanstack/react-router";
import { CustomerAutocompleteFormField } from "../autocomplete/customer.autocomplete";
import { cn } from "@/lib/utils";
import { gColorWhBg, rColorWhBg } from "@/utils/color";
import { FieldPregnantRadio } from "@/components/common/pregnant.field";

type TProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function AddPatientForm({ setOpen }: TProps) {
  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      customerId: "",
      ktp: "",
      fullname: "",
      birthDate: "",
      phone: "",
      gender: "",
      departement: "",
      pregnant: "",
      unit: "",
      email: "",
    },
  });

  const nav = useNavigate({ from: "/registration/patient" });
  const { mutate, isPending } = useAddPatientMutation();

  const gender = form.watch("gender");

  const handleReset = useCallback(() => {
    form.reset();
  }, []);

  function onSubmit(values: z.infer<typeof patientFormSchema>) {
    if (!dateValidation(values.birthDate)) {
      form.setError("birthDate", {
        message: "Invalidate Date!",
      });
      return;
    }

    const patientData = {
      ...values,
      ["gender"]: Number(values.gender),
      ["password"]: values.ktp.slice(-8),
      ["birthDate"]: values.birthDate.split("-").reverse().join("-"),
      ["isPregnant"]: values.pregnant === "1" ? true : false,
    };
    delete patientData.pregnant;

    mutate(patientData, {
      onSuccess: ({ message }) => {
        nav({
          to: "/registration/patient",
          search: {
            registered: false,
            page: 1,
            limit: 20,
          },
        });
        handleReset();
        setOpen(false);
        ToastSuccess(message);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5 items-start">
          <CustomerAutocompleteFormField form={form} />
          <ReusableFormField
            form={form}
            name="ktp"
            title="NIK/NIP"
            loading={isPending}
          />
          <ReusableFormField
            form={form}
            name="fullname"
            title="Full Name"
            loading={isPending}
          />
          <InputDateField
            form={form}
            name="birthDate"
            title="Birth Date"
            loading={isPending}
          />
          <ReusableFormField
            form={form}
            name="email"
            title="Email"
            loading={isPending}
          />
          <ReusableFormField
            form={form}
            name="phone"
            title="Phone Number"
            loading={isPending}
          />
          <FieldGenderRadio
            form={form}
            label={"Gender"}
            name="gender"
            loading={false}
          />
          <FieldPregnantRadio
            form={form}
            label="Pregnant"
            name="pregnant"
            loading={false}
            disabled={gender === "1" || !gender}
          />
          <ReusableFormField
            form={form}
            name="departement"
            title="Departement"
            loading={isPending}
          />
          <ReusableFormField
            form={form}
            name="unit"
            title="Unit"
            loading={isPending}
          />
        </div>
        <div className="flex gap-2 w-fit ml-auto">
          <Button
            type="reset"
            size={"sm"}
            onClick={handleReset}
            className={cn(" text-white text-xs", rColorWhBg)}
            disabled={isPending}
          >
            Reset
          </Button>
          <Button
            type="submit"
            size={"sm"}
            className={cn(" text-white text-xs", gColorWhBg)}
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
