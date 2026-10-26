import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { WindComparison } from "../types";

interface ForecastActualChartProps {
  data: WindComparison[];
}

export function ForecastActualChart({
  data,
}: ForecastActualChartProps) {
   const chartData = data.map((item) => ({
  ...item,
  time: new Date(
    item.timestamp
  ).toLocaleTimeString("en-GB", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }),
}));

if (!data.length) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-lg font-semibold text-white">
        Forecast vs Actual Generation
      </h2>

      <div className="flex h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          No data available for the selected period.
        </p>
      </div>
    </div>
  );
}

return (
  <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-white">
        Forecast vs Actual Generation
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Comparison of forecasted and actual wind generation.
      </p>
    </div>

    <div className="h-[400px] w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="time"
          />
<YAxis
  tickFormatter={(value) =>
    `${(value / 1000).toFixed(0)}k`
  }
/>

          <Tooltip
  formatter={(value) =>
    `${Number(value).toLocaleString()} MW`
  }
/>

          <Legend />

          <Line
            type="monotone"
            dataKey="forecast"
            name="Forecast"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="actual"
            name="Actual"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
}