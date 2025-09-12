import ImportPatientBtn from "./button/import-patient.btn";
import { TemplateExcelPatientBtn } from "./button/template-excel.btn";
import { AddPatientDialog } from "./dialog/add-patient.dialog";
import { GlobalSearch } from "./input/search.input";

export const RegistrationPatientHeader = () => {
  return (
    <header className="flex justify-between">
      <div className="flex gap-2">
        <GlobalSearch />
        <AddPatientDialog />
      </div>
      <div className="flex gap-2">
        <ImportPatientBtn />
        <TemplateExcelPatientBtn />
      </div>
    </header>
  );
};
