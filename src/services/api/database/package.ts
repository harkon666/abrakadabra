import { api } from "@/lib/api";
import type {
  IDatabasePackageResponse,
  SearchParams,
  TNewPackage,
} from "@/types";

export const getPackageApi = async (
  params: SearchParams
): Promise<IDatabasePackageResponse> => {
  const res = await api.get("/package", { params });
  return res.data;
};

export const getPackageAutocompleteApi = async (): Promise<any> => {
  const res = await api.get(`/package`);
  return res.data;
};

export const postAddPackageApi = async (data: TNewPackage) => {
  const res = await api.post("/package", data);
  return res.data;
};

export const postAddPackageItemApi = async (
  data: Omit<TNewPackage, "price">
) => {
  const res = await api.post("/package/item", data);
  return res.data;
};
