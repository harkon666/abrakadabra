import type { RootState } from "@/lib/store";
import type { IRegistrationPatient } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface RegistrationSlice {
  dialogBarcode: boolean;
  dialogBarcodeData: IRegistrationPatient;

  dialogEditPatient: boolean;
  dialogEditPatientData: IRegistrationPatient;

  dialogPatientRegist: boolean;
  dialogPatientRegistData: IRegistrationPatient;
}

export const initialState: RegistrationSlice = {
  dialogBarcode: false,
  dialogBarcodeData: {} as IRegistrationPatient,

  dialogEditPatient: false,
  dialogEditPatientData: {} as IRegistrationPatient,

  dialogPatientRegist: false,
  dialogPatientRegistData: {} as IRegistrationPatient,
};

export const counterSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setDialogBarcode: (state, { payload }) => {
      state.dialogBarcode = payload;
    },
    setDialogBarcodeData: (state, { payload }) => {
      state.dialogBarcodeData = payload;
    },

    setDialogEditPatient: (state, { payload }) => {
      state.dialogEditPatient = payload;
    },
    setDialogEditPatientData: (state, { payload }) => {
      state.dialogEditPatientData = payload;
    },

    setDialogPatientRegist: (state, { payload }) => {
      state.dialogPatientRegist = payload;
    },
    setDialogPatientRegistData: (state, { payload }) => {
      state.dialogPatientRegistData = payload;
    },
  },
});

export const {
  setDialogBarcode,
  setDialogBarcodeData,
  setDialogEditPatient,
  setDialogEditPatientData,
  setDialogPatientRegist,
  setDialogPatientRegistData,
} = counterSlice.actions;

export const registration = (state: RootState) => state.registration;

export default counterSlice.reducer;
