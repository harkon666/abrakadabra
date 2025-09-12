import { toast } from "sonner";

export const ToastSuccess = (msg: string) => {
  return toast.success("Success!", {
    duration: 3000,
    description: msg,
    richColors: true,
    position: "top-right",
  });
};

export const ToastError = (msg: string) => {
  return toast.error("Error!", {
    duration: 3000,
    description: msg,
    richColors: true,
    position: "top-right",
  });
};

export const ToastWarning = (msg: string) => {
  return toast.success("Warning!", {
    duration: 3000,
    description: msg,
    richColors: true,
    position: "top-right",
  });
};
