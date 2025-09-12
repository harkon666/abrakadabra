import { Button } from "@/components/ui/button";
import { patientTemplateExcel } from "@/utils/template-excel-patient";
import { Download } from "lucide-react";
import { CustomerAutocomplete } from "../autocomplete/customer.autocomplete";
import { useState } from "react";
import type { Option } from "@/components/ui/autocomplete";

export const TemplateExcelPatientBtn = () => {
  const [value, setValue] = useState<Option>({ label: "", value: "" });

  return (
    <div className="flex gap-2">
      <Button
        disabled={value.value === ""}
        size={"icon"}
        variant={"outline"}
        onClick={() => patientTemplateExcel(value.value)}
      >
        <Download size={12} />
      </Button>
      <CustomerAutocomplete value={value} setValue={setValue} />
    </div>
  );
};
