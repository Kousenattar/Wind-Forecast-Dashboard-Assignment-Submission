import axios from "axios";

const ELEXON_BASE_URL =
  "https://data.elexon.co.uk/bmrs/api/v1";

export async function getWindForecast(
  from: string,
  to: string
) {
  const response = await axios.get(
    `${ELEXON_BASE_URL}/forecast/generation/wind`,
    {
      params: {
        from,
        to,
        format: "json",
      },
    }
  );

  return response.data;
}

export async function getActualWindSolar(
  from: string,
  to: string
) {
  const response = await axios.get(
    `${ELEXON_BASE_URL}/generation/actual/per-type/wind-and-solar`,
    {
      params: {
        from,
        to,
      },
    }
  );

  return response.data;
}