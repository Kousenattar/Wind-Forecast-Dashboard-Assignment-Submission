export interface WindForecast {
  publishTime: string;
  startTime: string;
  settlementDate: string;
  settlementPeriod: number;
  generation: number;
}

export interface WindActual {
  publishTime: string;
  businessType: string;
  psrType: string;
  quantity: number;
  startTime: string;
  settlementDate: string;
  settlementPeriod: number;
}

export interface WindForecastResponse {
  success: boolean;
  data: {
    metadata: {
      datasets: string[];
    };
    data: WindForecast[];
  };
}

export interface WindActualResponse {
  success: boolean;
  data: {
    metadata: {
      datasets: string[];
    };
    data: WindActual[];
  };
}

export interface WindComparison {
  timestamp: string;
  forecast: number;
  actual: number;
  error: number;
  absoluteError: number;
  percentageError: number;
}

export interface WindDashboardData {
  comparison: WindComparison[];
}
export interface WindDashboardResponse {
  success: boolean;
  data: WindDashboardData;
  message?: string;
}