import { z } from "zod";

export const AddPackageSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required!",
  }),
  price: z.string().min(2, {
    message: "Price is required!",
  }),
});
