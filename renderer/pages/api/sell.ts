import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import useApiConfig from "@hooks/useApiConfig";
import { getUpbitAccountInfo } from "@utils/account";
import jwt from "jsonwebtoken";
import querystring from "querystring";

interface tradingHookMessage {
  type: string;
  market: string;
  price: string;
  volume: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { server_url, createToken } = useApiConfig();

  const { type, market, price, volume } = req.body as tradingHookMessage;

  let myRecentCrypto;
  const currency = market?.split("-")[1];

  try {
    myRecentCrypto = await getUpbitAccountInfo(currency);
  } catch (error: any) {
    return res.status(500).json({ error });
  }
  try {
    const response = await order_ask(market, myRecentCrypto, null);
    return res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data || { message: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

async function order_ask(
  market: string,
  volume: number | null,
  price: number | null
) {
  const url = "https://api.upbit.com/v1/orders";
  const qs = {
    market: market,
    side: "ask",
    volume: volume,
    price: price,
    ord_type: price ? "limit" : "market",
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

async function request(url, qs, token, method) {
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
