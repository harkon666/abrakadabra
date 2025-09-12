import { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { type AgChartOptions } from "ag-charts-community";

type TDonutChart = {
  data: {
    label: string;
    value: number;
  }[];
};

export const DonutChart = ({ data }: TDonutChart) => {
  const [options] = useState<AgChartOptions>({
    data: data,
    series: [
      {
        type: "donut",
        calloutLabelKey: "label",
        angleKey: "value",
        calloutLabel: {
          enabled: false,
        },
      },
    ],
    legend: {
      enabled: false,
    },

    padding: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
    },
    height: 200,
    background: {
      fill: "transparent",
    },
  });

  return (
    <AgCharts
      options={options}
      className="border border-muted-foreground/20 rounded-xl"
    />
  );
};
