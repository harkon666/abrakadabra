import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  setDialogEditPatient,
  setDialogEditPatientData,
} from "@/reducers/registration";
import type { IRegistrationPatient } from "@/types";
import { Edit } from "lucide-react";
import { EditPatientForm } from "../form/edit-patient.form";

const EditPatientDialog = () => {
  const { dialogEditPatient, dialogEditPatientData } = useAppSelector(
    (state) => state.registration
  );
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={dialogEditPatient}
      onOpenChange={(f) => {
        if (!f) {
          dispatch(setDialogEditPatientData({} as IRegistrationPatient));
        }
        dispatch(setDialogEditPatient(f));
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Patient</DialogTitle>
        </DialogHeader>

        <EditPatientForm data={dialogEditPatientData} />
      </DialogContent>
    </Dialog>
  );
};
export default EditPatientDialog;

export const EditPatientDialogButton = ({
  data,
}: {
  data: IRegistrationPatient;
}) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(setDialogEditPatient(true));
        dispatch(setDialogEditPatientData(data));
      }}
      size={"sm"}
      variant={"outline"}
      className="w-7 h-7 hover:cursor-pointer active:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Edit />
    </Button>
  );
};
