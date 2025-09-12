import type { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";

interface databaseSlice {
  dialogAddPackage: boolean;
  dialogAddPackageItem: boolean;
  dialogDetailPackage: any;
}

export const initialState: databaseSlice = {
  dialogAddPackage: false,
  dialogAddPackageItem: false,
  dialogDetailPackage: {},
};

export const counterSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    setDialogAddPackage: (state, { payload }) => {
      state.dialogAddPackage = payload;
    },
    setDialogAddPackageItem: (state, { payload }) => {
      state.dialogAddPackageItem = payload;
    },
    setDialogDetailPackage: (state, { payload }) => {
      state.dialogDetailPackage = payload;
    },
  },
});

export const {
  setDialogAddPackage,
  setDialogAddPackageItem,
  setDialogDetailPackage,
} = counterSlice.actions;

export const registration = (state: RootState) => state.database;

export default counterSlice.reducer;
