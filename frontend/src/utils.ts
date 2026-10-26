import type { WindActual, WindForecast } from "./types";

export interface WindComparison {
  timestamp: string;
  forecast: number;
  actual: number;
  error: number;
  absoluteError: number;
  percentageError: number;
}

export function prepareWindActualData(actualData: WindActual[]) {
  const windOnly = actualData.filter(
    (item) =>
      item.psrType === "Wind Onshore" || item.psrType === "Wind Offshore",
  );

  const grouped = new Map<string, number>();

  for (const item of windOnly) {
    const current = grouped.get(item.startTime) ?? 0;

    grouped.set(item.startTime, current + item.quantity);
  }

  return Array.from(grouped.entries()).map(([timestamp, actual]) => ({
    timestamp,
    actual,
  }));
}

export function createWindComparison(
  forecastData: WindForecast[],
  actualData: WindActual[],
): WindComparison[] {
  const actualWind = prepareWindActualData(actualData);

  const actualMap = new Map(
    actualWind.map((item) => [item.timestamp, item.actual]),
  );

  const result: WindComparison[] = [];

  for (const forecast of forecastData) {
    const actual = actualMap.get(forecast.startTime);

    if (actual === undefined) {
      continue;
    }

    const error = actual - forecast.generation;

    const absoluteError = Math.abs(error);

    const percentageError =
      actual !== 0 ? (absoluteError / Math.abs(actual)) * 100 : 0;

    result.push({
      timestamp: forecast.startTime,
      forecast: forecast.generation,
      actual,
      error,
      absoluteError,
      percentageError,
    });
  }

  return result;
}

export function calculateDashboardMetrics(data: WindComparison[]) {
  if (!data.length) {
    return {
      averageForecast: 0,
      averageActual: 0,
      mae: 0,
      mape: 0,
      accuracy: 0,
    };
  }

  const averageForecast =
    data.reduce((sum, item) => sum + item.forecast, 0) / data.length;

  const averageActual =
    data.reduce((sum, item) => sum + item.actual, 0) / data.length;

  const mae =
    data.reduce((sum, item) => sum + item.absoluteError, 0) / data.length;

  const mape =
    data.reduce((sum, item) => sum + item.percentageError, 0) / data.length;

  const accuracy = Math.max(0, 100 - mape);

  return {
    averageForecast,
    averageActual,
    mae,
    mape,
    accuracy,
  };
}

export function calculateWindAnalysis(data: WindComparison[]) {
  if (!data.length) {
    return null;
  }

  const maxError = data.reduce((max, item) =>
    item.absoluteError > max.absoluteError ? item : max,
  );

  const minError = data.reduce((min, item) =>
    item.absoluteError < min.absoluteError ? item : min,
  );

  const averageError =
    data.reduce((sum, item) => sum + item.error, 0) / data.length;

  const averageAbsoluteError =
    data.reduce((sum, item) => sum + item.absoluteError, 0) / data.length;

  const averagePercentageError =
    data.reduce((sum, item) => sum + item.percentageError, 0) / data.length;

  const overPredictions = data.filter((item) => item.error < 0).length;

  const underPredictions = data.filter((item) => item.error > 0).length;

  const accuratePredictions = data.filter(
    (item) => item.percentageError <= 5,
  ).length;

  return {
    maxError,
    minError,
    averageError,
    averageAbsoluteError,
    averagePercentageError,
    overPredictions,
    underPredictions,
    accuratePredictions,
    totalPoints: data.length,
  };
}
