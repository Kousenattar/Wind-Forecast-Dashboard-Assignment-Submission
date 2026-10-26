import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import type { WindComparison } from "../types";


interface ForecastErrorChartProps {
  data: WindComparison[];
}

function ForecastErrorChart({
  data,
}: ForecastErrorChartProps) {
  if (!data.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-white">
          Forecast Error
        </h2>

        <div className="flex h-[350px] items-center justify-center">
          <p className="text-sm text-slate-500">
            No data available for the selected period.
          </p>
        </div>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    ...item,
    time: new Date(item.timestamp).toLocaleTimeString(
      "en-GB",
      {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    ),
  }));
  console.log("Error chart data:", chartData.length);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Forecast Error
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Difference between forecast and actual wind generation.
        </p>
      </div>

      <div className="h-[350px] w-full">
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
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="time" />

 <YAxis
  domain={[
    (dataMin: number) =>
      Math.min(dataMin, 0),

    (dataMax: number) =>
      Math.max(dataMax, 0),
  ]}
  tickFormatter={(value) =>
    `${(value / 1000).toFixed(1)}k`
  }
/>

           <Tooltip
  content={<CustomTooltip />}
/>
<ReferenceLine
  y={0}
  stroke="#94a3b8"
  strokeDasharray="4 4"
/>
            <Line
              type="monotone"
              dataKey="error"
              name="Forecast Error"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ForecastErrorChart;


export const CustomTooltip = ({
  active,
  payload,
  label,
}: any) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 shadow-xl">
      <p className="mb-2 text-sm font-medium text-slate-300">
        {label} UTC
      </p>

      <p className="text-sm text-orange-400">
        Forecast Error:{" "}
        {Number(
          payload[0].value
        ).toLocaleString()}{" "}
        MW
      </p>
    </div>
  );
};