import { Request, Response } from "express";
import { getActualWindSolar, getWindForecast } from "../service/elexonService";


export async function windForecast(
  req: Request,
  res: Response
) {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "from and to dates are required",
      });
    }

    const data = await getWindForecast(
      String(from),
      String(to)
    );

    res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error(
      "Wind forecast error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch wind forecast",
      error: error.response?.data || error.message,
    });
  }
}

export async function actualWindSolar(
  req: Request,
  res: Response
) {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "from and to dates are required",
      });
    }

    const data = await getActualWindSolar(
      String(from),
      String(to)
    );

    res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error(
      "Actual wind/solar error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch actual generation",
      error: error.response?.data || error.message,
    });
  }
}


export async function windDashboard(
  req: Request,
  res: Response
) {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "from and to dates are required",
      });
    }

    console.log("Dashboard request:");
    console.log("from:", from);
    console.log("to:", to);

    // 1. Get forecast and actual data
    const [forecastResponse, actualResponse] =
      await Promise.all([
        getWindForecast(
          String(from),
          String(to)
        ),

        getActualWindSolar(
          String(from),
          String(to)
        ),
      ]);

    // 2. Extract arrays
    const forecastData =
      forecastResponse.data ?? [];

    const actualData =
      actualResponse.data ?? [];

    console.log(
      "Forecast records:",
      forecastData.length
    );

    console.log(
      "Actual records:",
      actualData.length
    );

    // 3. Keep only wind actual records
    const windActualData = actualData.filter(
      (item: any) =>
        item.psrType === "Wind Onshore" ||
        item.psrType === "Wind Offshore"
    );

    // 4. Group actual wind by startTime
    const actualMap = new Map<
      string,
      number
    >();

    for (const item of windActualData) {
      const current =
        actualMap.get(item.startTime) ?? 0;

      actualMap.set(
        item.startTime,
        current + item.quantity
      );
    }

    // 5. Match forecast with actual
    const comparison = [];

    for (const forecast of forecastData) {
      const actual =
        actualMap.get(forecast.startTime);

      if (actual === undefined) {
        continue;
      }

      const error =
        actual - forecast.generation;

      const absoluteError =
        Math.abs(error);

      const percentageError =
        actual !== 0
          ? (absoluteError / Math.abs(actual)) *
            100
          : 0;

      comparison.push({
        timestamp: forecast.startTime,
        forecast: forecast.generation,
        actual,
        error,
        absoluteError,
        percentageError,
      });
    }

    console.log(
      "Comparison records:",
      comparison.length
    );

    res.json({
      success: true,
      data: {
        comparison,
      },
    });

  } catch (error: any) {
    console.error(
      "Dashboard error:",
      error.response?.data ||
        error.message
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch wind dashboard",
      error:
        error.response?.data ||
        error.message,
    });
  }
}