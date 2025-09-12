import { api, apiForm } from "@/lib/api";
import type { RegistrationPatientParams } from "@/routes/_layout/registration/patient";
import type {
  IAddPatientRequest,
  IEditPatientRequest,
  IRegistrationPatientResponse,
} from "@/types";

export const registrationPatientApi = async (
  params: RegistrationPatientParams
): Promise<IRegistrationPatientResponse> => {
  const res = await api.get("/patient", { params });
  return res.data;
};

export const addPatientApi = async (
  data: IAddPatientRequest
): Promise<IRegistrationPatientResponse> => {
  const res = await api.post("/patient", data);
  return res.data;
};

export const importPatientApi = async (formData: FormData) => {
  const res = await apiForm.post("/patient/import", { file: formData });
  return res.data;
};

export const editRegistrationPatientApi = async (
  data: IEditPatientRequest
): Promise<IRegistrationPatientResponse> => {
  const { id, ...requestData } = data;

  const res = await api.put(`/patient/${id}`, requestData);
  return res.data;
};

export const patientRegist = async (id: string) => {
  const res = await api.post(`/patient/registration`, {
    id,
  });
  return res.data;
};
