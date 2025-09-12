import { z } from "zod";

export const editPatientFormSchema = z.object({
  ktp: z.string().min(1, { message: "KTP is required" }),
  // .min(16, { message: "KTP is not valid!" })
  // .max(16, { message: "KTP is not valid!" }),
  fullname: z.string().min(1, { message: "Full Name is required" }),
  birthDate: z.string().min(6, { message: "Birth Date is required!" }),
  phone: z.string().min(1, { message: "Phone Number is required" }),
  gender: z.string().min(1, { message: "Please at least choose one gender" }),
  departement: z.string().min(1, { message: "Departement is required!" }),
  unit: z.string().min(1, { message: "Unit is required!" }),
  pregnant: z.boolean(),
});
