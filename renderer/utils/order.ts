import axios from "axios";
import useApiConfig from "@hooks/useApiConfig";

export async function order(
  market: string,
  volume: number | null,
  price: number | null,
  side: "bid" | "ask",
  ord_type: "limit" | "price" | "market"
) {
  const url = "https://api.upbit.com/v1/orders";
  const { createToken } = useApiConfig();

  const qs = {
    market: market,
    side: side,
    volume: volume,
    price: price,
    ord_type: ord_type,
  };

  const token = createToken(qs);

  return await request(url, qs, token, "POST");
}

export async function request(url, qs, token, method) {
  const options = {
    method: method,
    url: url,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    data: method === "POST" ? qs : {},
    params: method === "GET" ? qs : {},
  };

  try {
    const response = await axios(options);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("Network or other error");
    }
  }
}
