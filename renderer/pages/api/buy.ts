import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import useApiConfig from "@hooks/useApiConfig";
import { getUpbitAccountInfo } from "@utils/account";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { server_url, token } = useApiConfig();

  const { type, market, price, volume } = req.body;

  let myRecentKRW;

  try {
    myRecentKRW = await getUpbitAccountInfo();
  } catch (error: any) {
    return res.status(500).json({ error });
  }

  const purchaseAmount = myRecentKRW * 0.95;

  const purchaseVolume = purchaseAmount / price;

  try {
    const response = await axios.post(
      `${server_url}/v1/orders`,
      {
        market,
        side: type,
        volume: purchaseVolume,
        ord_type: "price",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while buying" });
  }
};
