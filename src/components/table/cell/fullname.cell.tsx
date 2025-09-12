import { Phone, User } from "lucide-react";

const FullNameCell = ({ name, phone }: { name: string; phone: string }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <User className="w-3 h-3 text-muted-foreground" />
        <span className="font-medium text-sm">{name}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Phone className="w-3 h-3" />
        {phone}
      </div>
    </div>
  );
};

export default FullNameCell;
