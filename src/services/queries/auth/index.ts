import { loginApi } from "@/services/api/auth";
import type { ApiError, LoginCredentials, LoginResponse } from "@/types";
import { ToastError } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

export function useLoginMutation() {
  return useMutation<
    AxiosResponse<LoginResponse>,
    AxiosResponse<ApiError>,
    LoginCredentials
  >({
    mutationFn: loginApi,
    onError: ({
      response: {
        data: { message },
      },
    }: any) => {
      const error = message || "Internal server error";
      ToastError(error);
    },
  });
}
