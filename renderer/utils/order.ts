import axios from "axios";
import jwt from "jsonwebtoken";
import querystring from "querystring";

export async function order(
  market: string,
  volume: number | null,
  price: number | null,
  side: "bid" | "ask",
  ord_type: "limit" | "price" | "market"
) {
  const url = "https://api.upbit.com/v1/orders";
  const qs = {
    market: market,
    side: side,
    volume: volume,
    price: price,
    ord_type: ord_type,
  };

  const query = querystring.encode(qs);
  const payload = {
    access_key: process.env.NEXT_PUBLIC_UPBIT_OPEN_API_ACCESS_KEY,
    nonce: new Date().getTime(),
    query: query,
  };
  const token = jwt.sign(
    payload,
    process.env.NEXT_PUBLIC_UPBIT_OPEN_API_SECRET_KEY
  );

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
