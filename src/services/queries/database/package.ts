import {
  getPackageApi,
  getPackageAutocompleteApi,
  postAddPackageApi,
  postAddPackageItemApi,
} from "@/services/api/database/package";
import { ToastError } from "@/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useAddPackageMutation = () => {
  return useMutation({
    mutationFn: postAddPackageApi,
    onError: (error: AxiosError<{ message: string }>) => {
      const msg = error?.response?.data?.message || "Failed to add package";
      ToastError(msg);
    },
  });
};

export const useAddPackageItemMutation = () => {
  return useMutation({
    mutationFn: postAddPackageItemApi,
    onError: (error: AxiosError<{ message: string }>) => {
      const msg = error?.response?.data?.message || "Failed to add package";
      ToastError(msg);
    },
  });
};

export const useGetPackageAutocompleteQuery = () => {
  return useQuery({
    queryKey: ["package:autocomplete"],
    queryFn: getPackageAutocompleteApi,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
