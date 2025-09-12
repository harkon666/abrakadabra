import { customerApi } from "@/services/api/customer";
import {
  addPatientApi,
  editRegistrationPatientApi,
  importPatientApi,
  patientRegist,
} from "@/services/api/registration/patient";
import { ToastError } from "@/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useAddPatientMutation = () => {
  return useMutation({
    mutationFn: addPatientApi,
    onError: (error: AxiosError<{ message: string }>) => {
      const msg = error?.response?.data?.message || "Internal server error";
      ToastError(msg);
    },
  });
};

export const useGetCustomersQuery = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => customerApi({ page: 1, limit: 100 }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useImportPatientMutation = () => {
  return useMutation({
    mutationFn: importPatientApi,
    onError: (error: AxiosError<{ message: string }>) => {
      const msg = error?.response?.data?.message || "Failed to import patient";
      ToastError(msg);
    },
  });
};

export const useEditPatientMutation = () => {
  return useMutation({
    mutationFn: editRegistrationPatientApi,
    onError: (error: AxiosError<{ message: string }>) => {
      const msg = error?.response?.data?.message || "Failed to edit patient";
      ToastError(msg);
    },
  });
};

export const usePatientRegist = () => {
  return useMutation({
    mutationFn: patientRegist,
    onError: (error: AxiosError<{ message: string }>) => {
      const msg =
        error?.response?.data?.message || "Failed to register patient";
      ToastError(msg);
    },
  });
};
