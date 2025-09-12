import { z } from "zod";

export const patientFormSchema = z.object({
  customerId: z.string().min(1, { message: "Customer is required!" }),
  ktp: z.string().min(1, { message: "NIK/NIP is required" }),
  // .min(16, { message: "KTP is not valid!" })
  // .max(16, { message: "KTP is not valid!" }),
  fullname: z.string().min(1, { message: "Full Name is required" }),
  birthDate: z.string().min(6, { message: "Birth Date is required!" }),
  phone: z.string().min(1, { message: "Phone Number is required" }),
  gender: z.string().min(1, { message: "Please at least choose one gender" }),
  pregnant: z.string().optional(),
  departement: z.string().min(1, { message: "Departement is required!" }),
  unit: z.string().min(1, { message: "Unit is required!" }),
  email: z.string().min(1, { message: "Email is required!" }).email(),
});
