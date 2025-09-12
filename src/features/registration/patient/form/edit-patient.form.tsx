import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ReusableFormField } from "@/components/common/form.field";
import { useCallback } from "react";
import { FieldGenderRadio } from "@/components/common/gender.field";
import { InputDateField } from "@/components/common/input-date.field";
import { dateValidation } from "@/utils/date-validation";
import type { IRegistrationPatient } from "@/types";
import { editPatientFormSchema } from "@/schemas/edit-patient.schema";
import { useEditPatientMutation } from "@/services/queries/patient";
import { ToastSuccess } from "@/utils/toast";
import { useNavigate } from "@tanstack/react-router";
import {
  setDialogEditPatient,
  setDialogEditPatientData,
} from "@/reducers/registration";
import { useAppDispatch } from "@/lib/store";
import { FieldPregnantRadio } from "@/components/common/pregnant.field";

export function EditPatientForm({ data }: { data: IRegistrationPatient }) {
  const form = useForm<z.infer<typeof editPatientFormSchema>>({
    resolver: zodResolver(editPatientFormSchema),
    defaultValues: {
      ktp: data?.ktp || "",
      fullname: data?.fullName || "",
      birthDate: data?.birthDate?.split("-").reverse().join("-") || "",
      phone: data?.phone || "",
      gender: data?.gender?.toString() || "",
      departement: data?.departement || "",
      unit: data?.unit || "",
      pregnant: data?.isPregnant || false,
    },
  });

  const dispatch = useAppDispatch();
  const { mutate, isPending } = useEditPatientMutation();
  const nav = useNavigate({ from: "/registration/patient" });

  const gender = data.gender;

  const handleReset = useCallback(() => {
    form.reset();
  }, []);

  function onSubmit(values: z.infer<typeof editPatientFormSchema>) {
    if (!dateValidation(values.birthDate)) {
      form.setError("birthDate", {
        message: "Invalidate Date!",
      });
      return;
    }

    const patientData = {
      ...values,
      ["id"]: data?.id,
      ["customerId"]: data?.customerId,
      ["gender"]: Number(values.gender),
      ["birthDate"]: values.birthDate.split("-").reverse().join("-"),
    };

    console.log(patientData, "ini patient data");
    return;

    mutate(patientData, {
      onSuccess: () => {
        ToastSuccess("Edit patient successfully");
        dispatch(setDialogEditPatient(false));
        dispatch(setDialogEditPatientData({}));
        nav({
          to: "/registration/patient",
          search: {
            registered: false,
            page: 1,
            limit: 20,
          },
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5 items-start">
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
            name="phone"
            title="Phone Number"
            loading={isPending}
          />
          <FieldGenderRadio
            form={form}
            label={"Gender"}
            name="gender"
            loading={isPending}
          />
          {/* <FieldPregnantRadio
            form={form}
            label="Pregnant"
            name="pregnant"
            loading={false}
            // disabled={gender !== 2 || false}
          /> */}
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
            onClick={handleReset}
            className="bg-red-500/80 hover:bg-red-500 text-white"
            disabled={isPending}
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="bg-green-500/80 hover:bg-green-500 text-white"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
