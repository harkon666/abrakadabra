import { addCustomerApi, importCustomerApi } from "@/services/api/customer";
import { ToastError } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useAddCustomerMutation = () => {
  return useMutation({
    mutationFn: addCustomerApi,
    onError: () => {
      ToastError("Failed to add customer");
    },
  });
};

export const useImportCustomerMutation = () => {
  return useMutation({
    mutationFn: importCustomerApi,
    onError: (error: AxiosError<{ message: string }>) => {
      const msg = error?.response?.data?.message || "Failed to import customer";
      ToastError(msg);
    },
  });
};
