import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  setDialogPatientRegist,
  setDialogPatientRegistData,
} from "@/reducers/registration";
import { usePatientRegist } from "@/services/queries/patient";
import type { IRegistrationPatient } from "@/types";
import { ToastError, ToastSuccess } from "@/utils/toast";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircleIcon } from "lucide-react";
import { useCallback } from "react";

const formatDate = (dateString?: string): string => {
  if (!dateString) return "-";
  return dateString.split("-").reverse().join("-");
};

const formatGender = (gender: number, pregnant: boolean): string => {
  return gender === 1 ? "Laki-Laki" : `Perempuan${pregnant ? " (H)" : ""}`;
};

export const PatientRegistDialog = () => {
  const { dialogPatientRegist, dialogPatientRegistData } = useAppSelector(
    (state) => state.registration
  );
  const dispatch = useAppDispatch();
  const { mutate, isPending } = usePatientRegist();
  const nav = useNavigate({ from: "/registration/patient" });

  const handleDialogClose = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        dispatch(setDialogPatientRegistData({} as IRegistrationPatient));
      }
      dispatch(setDialogPatientRegist(isOpen));
    },
    [dispatch]
  );

  const patientFields = [
    { label: "Full Name", value: dialogPatientRegistData.fullName },
    { label: "NIK", value: dialogPatientRegistData.ktp },
    {
      label: "Birth Date",
      value: formatDate(dialogPatientRegistData.birthDate),
    },
    {
      label: "Gender",
      value: formatGender(
        dialogPatientRegistData.gender,
        dialogPatientRegistData.isPregnant
      ),
    },
    { label: "Phone Number", value: dialogPatientRegistData.phone },
  ];

  const reset = () => {
    dispatch(setDialogPatientRegistData({} as IRegistrationPatient));
    dispatch(setDialogPatientRegist(false));
  };

  const handleRegistration = useCallback(() => {
    if (!dialogPatientRegistData.gender) {
      return ToastError("Gender is required, please edit it.");
    }
    mutate(dialogPatientRegistData.id, {
      onSuccess: ({ message }) => {
        reset();
        nav({
          to: "/registration/patient",
          search: { registered: false, page: 1, limit: 20 },
        });
        ToastSuccess(message);
      },
    });
  }, [dialogPatientRegist, dialogPatientRegistData]);

  return (
    <Dialog open={dialogPatientRegist} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>

        <div className="w-full p-4 border rounded-lg relative">
          <div className="absolute -top-2 left-3 bg-white dark:bg-black dark:text-white px-2 text-xs text-muted-foreground italic">
            Patient No / {dialogPatientRegistData.tempPatientNo || "-"}
          </div>

          <div className="space-y-3 mt-2">
            {patientFields.map((field, index) => (
              <div key={index} className="flex text-sm">
                <span className="w-1/2 font-medium text-muted-foreground">
                  {field.label}
                </span>
                <span className="min-w-1/2">: {field.value || "-"}</span>
              </div>
            ))}
          </div>
        </div>
        <Button size={"sm"} disabled={isPending} onClick={handleRegistration}>
          {isPending ? "Loading..." : "Register"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export const PatientRegistDialogButton = ({
  data,
}: {
  data: IRegistrationPatient;
}) => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(setDialogPatientRegist(true));
    dispatch(setDialogPatientRegistData(data));
  }, [dispatch, data]);

  return (
    <Button
      onClick={handleClick}
      disabled={!!data.patientNo}
      size="sm"
      variant="outline"
      className="w-7 h-7 p-0"
      aria-label="View patient details"
    >
      <CheckCircleIcon className="w-4 h-4" />
    </Button>
  );
};
