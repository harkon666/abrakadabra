import { DonutChart } from "@/components/chart/donut.chart";
import { DashboardTable } from "./table";

export const DashboardContent = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <DonutChart key={index} data={[{ label: "Stocks", value: 60000 }]} />
        ))}
      </div>
      <DashboardTable />
    </div>
  );
};
