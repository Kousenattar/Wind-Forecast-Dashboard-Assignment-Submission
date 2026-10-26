import axios from "axios";
import type { WindDashboardResponse } from "../types";
import toast from "react-hot-toast";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function getWindDashboard(
  from: string,
  to: string
): Promise<WindDashboardResponse> {
    try {
  const response = await api.get<WindDashboardResponse>(
    "/wind/dashboard",
    {
      params: {
        from,
        to,
      },
    }
  );

  return response.data;

}
catch (error: any) {
  console.error(
    "Wind dashboard API error:",
    error.response?.data || error.message
  );
  toast.error(
    error.response?.data?.message || "Failed to fetch wind dashboard data"
  );
  throw new Error(
    error.response?.data?.message || "Failed to fetch wind dashboard data"
  );

}

}