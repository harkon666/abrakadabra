import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "../reducers/registration";
import authReducer from "../reducers/auth";
import databaseReducer from "../reducers/database";
// ...

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    database: databaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
