import { z } from "zod";

export const AddPackageSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required!",
  }),
  price: z.string().min(2, {
    message: "Price is required!",
  }),
});

export const AddPackageItemSchema = z.object({
  packageId: z.string().min(1, { message: "Package is required!" }),
  name: z.string().min(2, {
    message: "Name is required!",
  }),
});
