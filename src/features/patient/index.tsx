import { lazy } from "react";
import { PatientContent } from "./content";
import { PatientFooter } from "./footer";
import { BarcodePatientDialog } from "./dialog/barcode-patient.dialog";
import { PatientHeader } from "./header";

const EditPatientDialog = lazy(() => import("./dialog/edit-patient.dialog"));

export const Patient = () => {
  return (
    <main className="w-full p-4 flex flex-col flex-grow min-h-0 overflow-hidden">
      <PatientHeader />
      <PatientContent />
      <PatientFooter />

      {/* dialog  */}
      <BarcodePatientDialog />
      <EditPatientDialog />
    </main>
  );
};
