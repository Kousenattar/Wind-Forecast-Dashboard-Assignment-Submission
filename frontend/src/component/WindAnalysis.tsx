import type { WindComparison } from "../types";
import { calculateWindAnalysis } from "../utils";


interface WindAnalysisProps {
  data: WindComparison[];
}

function WindAnalysis({
  data,
}: WindAnalysisProps) {
  const analysis = calculateWindAnalysis(data);

  if (!analysis) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-white">
          Forecast Analysis
        </h2>

        <p className="mt-4 text-sm text-slate-400">
          No data available for analysis.
        </p>
      </div>
    );
  }

  const maxErrorTime = new Date(
    analysis.maxError.timestamp
  ).toLocaleTimeString("en-GB", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const minErrorTime = new Date(
    analysis.minError.timestamp
  ).toLocaleTimeString("en-GB", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Forecast Analysis
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Performance insights for the selected period.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <div>
          <p className="text-sm text-slate-400">
            Maximum Error
          </p>

          <p className="mt-1 text-xl font-semibold text-white">
            {analysis.maxError.absoluteError.toLocaleString()} MW
          </p>

          <p className="mt-1 text-xs text-slate-500">
            At {maxErrorTime} UTC
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Minimum Error
          </p>

          <p className="mt-1 text-xl font-semibold text-white">
            {analysis.minError.absoluteError.toLocaleString()} MW
          </p>

          <p className="mt-1 text-xs text-slate-500">
            At {minErrorTime} UTC
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Over Predictions
          </p>

          <p className="mt-1 text-xl font-semibold text-white">
            {analysis.overPredictions}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            of {analysis.totalPoints} periods
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Under Predictions
          </p>

          <p className="mt-1 text-xl font-semibold text-white">
            {analysis.underPredictions}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            of {analysis.totalPoints} periods
          </p>
        </div>

      </div>

      <div className="mt-6 border-t border-slate-800 pt-6">

        <p className="text-sm leading-6 text-slate-300">
          The average forecast error was{" "}
          <strong>
            {analysis.averageError.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{" "}
            MW
          </strong>
          . The average absolute error was{" "}
          <strong>
            {analysis.averageAbsoluteError.toLocaleString(
              undefined,
              {
                maximumFractionDigits: 0,
              }
            )}{" "}
            MW
          </strong>
          , with an average percentage error of{" "}
          <strong>
            {analysis.averagePercentageError.toFixed(1)}%
          </strong>
          .
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          The forecast{" "}
          <strong>
            overestimated
          </strong>{" "}
          actual generation in{" "}
          <strong>
            {analysis.overPredictions}
          </strong>{" "}
          of {analysis.totalPoints} periods and{" "}
          <strong>
            underestimated
          </strong>{" "}
          it in{" "}
          <strong>
            {analysis.underPredictions}
          </strong>{" "}
          periods.
        </p>

      </div>
    </div>
  );
}

export default WindAnalysis;