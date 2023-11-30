import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import useApiConfig from "@hooks/useApiConfig";
import { getUpbitAccountInfo } from "@utils/account";

interface tradingHookMessage {
  type: string;
  market: string;
  price: string;
  volume: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { server_url, token } = useApiConfig();

  const { type, market, price, volume } = req.body as tradingHookMessage;

  let myRecentCrypto;
  const currency = market?.split("-")[1];

  try {
    myRecentCrypto = await getUpbitAccountInfo(currency);
  } catch (error: any) {
    return res.status(500).json({ error });
  }
  try {
    const response = await axios.post(
      `${server_url}/v1/orders`,
      {
        market,
        side: type,
        volume: myRecentCrypto,
        ord_type: "market",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while selling" });
  }
};
