import { getUpbitAccountInfo } from '@utils/account';
import { order } from '@utils/order';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { type, market, volume, price } = req.body;

  let myRecentKRW;

  try {
    myRecentKRW = await getUpbitAccountInfo();
  } catch (error) {
    return res.status(500).json({ error });
  }

  const purchaseAmount = (myRecentKRW * 0.9995).toString();

  try {
    const response = await order(market, null, purchaseAmount, type, 'price');
    return res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data || { message: error.message });
    }
    return res.status(500).json({ message: 'An unexpected error occurred' });
  }
};
