import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
interface TradingViewWebhookData {
  type: string;
  market: string;
  price: string;
  volume: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const message = req.body as TradingViewWebhookData;

      console.log('트레이딩뷰 웹훅 데이터:', message);

      const { type, market, price, volume } = message;

      let operation;
      if (type === 'bid') {
        operation = 'buy';
      } else if (type === 'ask') {
        operation = 'sell';
      } else {
        res.status(400).json({ message: '잘못된 타입입니다.' });
        return;
      }

      const webhookUrl = `http://localhost:8888/api/${operation}`;

      await axios.post(webhookUrl, { type, market, price, volume });

      res.status(200).json({ message: 'Buy/Sell Success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: '허용되지 않은 메소드' });
  }
}
