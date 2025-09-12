import { api } from "@/lib/api";
import type { LoginCredentials, LoginResponse } from "@/types";
import type { AxiosResponse } from "axios";

export async function loginApi(
  data: LoginCredentials
): Promise<AxiosResponse<LoginResponse>> {
  const res = await api.post("/auth/login", data);
  return res;
}
