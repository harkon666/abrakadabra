import { Building } from "lucide-react";

const DepartmentCell = ({
  unit,
  department,
}: {
  unit: string;
  department: string;
}) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <Building className="w-3 h-3 text-muted-foreground" />
        <span className="text-xs font-medium">{unit}</span>
      </div>
      <div className="text-xs text-muted-foreground pl-5">{department}</div>
    </div>
  );
};
export default DepartmentCell;
