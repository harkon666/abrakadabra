import type { loginSchema } from "@/schemas/login.schema";
import type { z } from "zod";

export type LoginCredentials = z.infer<typeof loginSchema>;

export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  role: string;
  accessToken: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  success: boolean;
  result: User;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface ColumnWidths {
  [key: string]: `${number}%`;
}

export interface BaseResponse {
  message: string;
  code: number;
  success: boolean;
}

export interface Metadata {
  total: number;
  page: string;
  limit: number;
  totalPages: number;
}

export interface IRegistrationPatient {
  id: string;
  created_at: string;
  updated_at: string;
  userId: string;
  customerId: string;
  packageId?: string;
  patientNo?: string;
  tempPatientNo?: string;
  ktp: string;
  fullName: string;
  birthDate: string;
  phone: string;
  gender: number;
  unit: string;
  departement: string;
  email?: string;
  registratedAt?: Date;
  isPregnant: boolean;
  inspectionAt?: Date;
}

interface BaseCustomer {
  name: string;
  address: string;
  address2: string;
  city: string;
  zipCode: string;
  phone: string;
  fax: string;
}

export interface ICustomer extends BaseCustomer {
  id: string;
  created_at: string;
  updated_at: string;
  userId: string;
}

export interface AddCustomerRequest extends BaseCustomer {
  email: string;
  password: string;
}

export interface AddCustomerRequest {
  fullname: string;
  birthDate: string;
  phone: string;
  gender: number;
  unit: string;
  departement: string;
  email: string;
  password: string;
}

export type SearchParams = {
  page: number;
  search?: string;
  limit: number;
  sort?: string;
  sortBy?: string;
};

export type TNewPackage = {
  name: string;
  price: number;
};

export interface IDatabasePackageResponse extends BaseResponse {
  metaData: Metadata;
  result: {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    price: number;
  }[];
}

export interface IRegistrationPatientResponse extends BaseResponse {
  result: IRegistrationPatient[] | [];
  metaData: Metadata;
}

export interface ICustomerResponse extends BaseResponse {
  result: ICustomer[] | [];
  metaData: Metadata;
}

export interface IPatient {
  ktp: string;
  fullname: string;
  birthDate: string;
  phone: string;
  gender: number;
  unit: string;
  departement: string;
  email: string;
}

export interface IAddPatientRequest extends IPatient {
  customerId: string;
  password: string;
}

export interface IEditPatientRequest extends Omit<IPatient, "email"> {
  id: string;
  customerId: string;
}

export interface IRegistrationResponse extends BaseResponse {
  result: IPatient[] | [];
  metaData: Metadata;
}

export type PatientParams = {
  page: number;
  search?: string;
  limit: number;
  sort?: string;
  sortBy?: string;
  registered: boolean;
};
