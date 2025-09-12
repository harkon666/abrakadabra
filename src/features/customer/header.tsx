import { AddCustomerDialog } from "./button/add-customer.btn";
import ImportCustomerBtn from "./button/import-customer.btn";
import { TemplateExcelCustomerBtn } from "./button/template-excel.btn";
import { GlobalSearch } from "./input/search.input";

export const CustomerHeader = () => {
  return (
    <header className="flex justify-between">
      <div className="flex gap-2">
        <GlobalSearch />
        <AddCustomerDialog />
      </div>
      <div className="flex gap-2">
        <ImportCustomerBtn />
        <TemplateExcelCustomerBtn />
      </div>
    </header>
  );
};
