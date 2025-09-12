import { Button } from "@/components/ui/button";
import { customerTemplateExcel } from "@/utils/template-excel-customer";
import { Download } from "lucide-react";

export const TemplateExcelCustomerBtn = () => {
  return (
    <Button
      size={"icon"}
      variant={"outline"}
      onClick={customerTemplateExcel}
      className="hover:cursor-pointer"
      title="Download Customer Template Excel"
      aria-label="Download Customer Template Excel"
    >
      <Download size={12} />
    </Button>
  );
};
