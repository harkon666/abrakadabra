import { cn } from "@/lib/utils";
import type { IRegistrationPatient } from "@/types";
import type { Row } from "@tanstack/react-table";
import { Mars, Venus } from "lucide-react";

const GENDER_CONFIG = {
  1: {
    label: "Laki-Laki",
    icon: Mars,
    bgColor: "bg-blue-500/60 text-white",
  },
  2: {
    label: "Perempuan",
    icon: Venus,
    bgColor: "bg-pink-500/60 text-white",
  },
} as const;

const GenderCell = ({ row }: { row: Row<IRegistrationPatient> }) => {
  const gender = row.getValue("gender") as number;
  const config = GENDER_CONFIG[gender as keyof typeof GENDER_CONFIG];

  if (!config) {
    return <span className="text-muted-foreground text-xs">-</span>;
  }

  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors",
        config.bgColor
      )}
    >
      <Icon className="w-3 h-3" />
      {config.label}
      {row.original.isPregnant && <p>(H)</p>}
    </div>
  );
};

export default GenderCell;
