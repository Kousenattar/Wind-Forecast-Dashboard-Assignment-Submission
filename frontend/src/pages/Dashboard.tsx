import { useState } from "react";
import type { WindComparison, WindDashboardResponse } from "../types";
import { getWindDashboard } from "../services/api";
import { calculateDashboardMetrics, calculateWindAnalysis } from "../utils";
import { ForecastActualChart } from "../component/ForCastActualChart";
import ForecastErrorChart from "../component/ErrorChart";
import WindAnalysis from "../component/WindAnalysis";
import toast from "react-hot-toast";

function Dashboard() {
  const [toDate, settoDate] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState<string>("");

  const [dashboardData, setDashboardData] = useState<WindComparison[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analysis = calculateWindAnalysis(dashboardData);

  const handleApply = async () => {
    console.log("Apply clicked");
    console.log("From:", fromDate);
    console.log("To:", toDate);

    // 1. Check both dates
    const from = new Date(`${fromDate}T00:00:00`);
    const to = new Date(`${toDate}T00:00:00`);

    if (from > to) {
      const message = "From date cannot be after To date.";

      console.log("INVALID DATE RANGE");

      setError(message);
      toast.error(message);

      return;
    }

    // 2. Check invalid date range
    // if (fromDate > toDate) {
    //   const message = "From date cannot be after To date.";

    //   setError(message);
    //   toast.error(message);

    //   return; // VERY IMPORTANT: API will NOT be called
    // }

    // 3. Only reach here if dates are valid
    try {
      setLoading(true);
      setError(null);

      const from = `${fromDate}T00:00:00Z`;
      const to = `${toDate}T23:59:59Z`;

      console.log("Calling API...");
      console.log("From:", from);
      console.log("To:", to);

      const response = await getWindDashboard(from, to);

      console.log("Dashboard response:", response);

      const comparison = response?.data?.comparison ?? [];

      
      if (comparison.length === 0) {
        const message =
          "No wind generation data available For this Date range";

        setDashboardData([]);
        setError(message);
        toast.warning(message);

        return;
      }

    
      setDashboardData(comparison);
      toast.success("Dashboard data loaded successfully.");
    } catch (err: any) {
      console.error("Dashboard error:", err);

      const message =
        err?.response?.data?.message || "Failed to load dashboard data.";

      setDashboardData([]);
      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const metrics = calculateDashboardMetrics(dashboardData);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Wind Forecast Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Compare forecasted wind generation with actual generation
            performance.
          </p>
        </div>

        {/* Dashboard content */}
        <div className="mt-8 space-y-6">
          {/* Date filter */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">Analysis Period</h2>

            <div className="mt-4 flex gap-4">
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  From
                </label>

                <input
                  value={fromDate || ""}
                  type="date"
                  onChange={(e) => setFromDate(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">To</label>

                <input
                  value={toDate || ""}
                  type="date"
                  onChange={(e) => settoDate(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleApply}
                  className="rounded-lg bg-blue-600 px-5 py-2 font-medium hover:bg-blue-500"
                >
                  {loading ? "Loading..." : "Apply"}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm font-medium text-red-400">{error}</p>
              )}
            </div>
          </div>

          {/* KPI placeholder */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">MAPE</p>

              <p className="mt-2 text-2xl font-bold">
                {metrics.mape.toFixed(1)}%
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Average Forecast</p>

              <p className="mt-2 text-2xl font-bold">
                {metrics.averageForecast.toLocaleString()} MW
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Average Actual</p>

              <p className="mt-2 text-2xl font-bold">
                {metrics.averageActual.toLocaleString()} MW
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">MAE</p>

              <p className="mt-2 text-2xl font-bold">
                {metrics.mae.toLocaleString()} MW
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Accuracy</p>

              <p className="mt-2 text-2xl font-bold">
                {metrics.accuracy.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Chart placeholder */}
          <div className="space-y-6">
            {/* KPI CARDS */}

            <ForecastActualChart data={dashboardData} />

            <ForecastErrorChart data={dashboardData} />

            <WindAnalysis data={dashboardData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
