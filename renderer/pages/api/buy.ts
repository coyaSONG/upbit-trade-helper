import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { order } from "@utils/order";
import { getUpbitAccountInfo } from "@utils/account";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { type, market, volume, price } = req.body;

  let myRecentKRW;

  try {
    myRecentKRW = await getUpbitAccountInfo();
    console.log("현재 잔고", myRecentKRW);
  } catch (error) {
    return res.status(500).json({ error });
  }

  const purchaseAmount = myRecentKRW * 0.99;

  try {
    const response = await order(market, null, purchaseAmount, type, "price");
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
