import { lazy } from "react";
import { RegistrationPatientContent } from "./content";
import { RegistationPatientFooter } from "./footer";
import { RegistrationPatientHeader } from "./header";
import { PatientRegistDialog } from "./dialog/patient-regist.dialog";

const EditPatientDialog = lazy(() => import("./dialog/edit-patient.dialog"));

export const Patient = () => {
  return (
    <main className="w-full p-4 flex flex-col flex-grow min-h-0 overflow-hidden">
      <RegistrationPatientHeader />
      <RegistrationPatientContent />
      <RegistationPatientFooter />

      {/* dialog  */}
      <EditPatientDialog />
      <PatientRegistDialog />
    </main>
  );
};
