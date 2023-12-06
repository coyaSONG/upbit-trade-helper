import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getUpbitAccountInfo } from "@utils/account";
import { order } from "@utils/order";
import { tradingHookMessage } from "../../types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { type, market, price, volume } = req.body as tradingHookMessage;

  let myRecentCrypto;
  const currency = market?.split("-")[1];

  try {
    myRecentCrypto = await getUpbitAccountInfo(currency);
  } catch (error: any) {
    return res.status(500).json({ error });
  }
  try {
    const response = await order(market, myRecentCrypto, null, type, "market");
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
