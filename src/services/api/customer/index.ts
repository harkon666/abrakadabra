import { api, apiForm } from "@/lib/api";
import type {
  AddCustomerRequest,
  ICustomerResponse,
  SearchParams,
} from "@/types";

export const customerApi = async (
  params: SearchParams
): Promise<ICustomerResponse> => {
  const res = await api.get("/customer", { params });
  return res.data;
};

export const addCustomerApi = async (data: AddCustomerRequest) => {
  const res = await api.post("/customer/add", data);
  return res.data;
};

export const importCustomerApi = async (formData: FormData) => {
  const res = await apiForm.post("/customer/import", { file: formData });
  return res.data;
};
