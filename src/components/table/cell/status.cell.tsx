import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  registered: {
    label: "Registered",
    bgColor: "bg-emerald-500/60 text-white",
    dotColor: "bg-emerald-400",
  },
  pending: {
    label: "Pending",
    bgColor: "bg-yellow-500/60 text-white",
    dotColor: "bg-yellow-400",
  },
} as const;

const StatusCell = ({
  status = "registered",
}: {
  status?: keyof typeof STATUS_CONFIG;
}) => {
  const config = STATUS_CONFIG[status];

  return (
    <div className="flex justify-end">
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-colors",
          config.bgColor
        )}
      >
        <div className={cn("w-1.5 h-1.5 rounded-full", config.dotColor)} />
        {config.label}
      </div>
    </div>
  );
};

export default StatusCell;
