import type { NextApiRequest, NextApiResponse } from "next";
import { ipcMain } from "electron";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const message = req.body.message;

      console.log("트레이딩뷰 웹훅 데이터:", req.body);

      const { type, market, price, volume } = req.body;

      const operation = type === "buy" ? "buy" : "sell";
      const webhookUrl = `http://localhost:8888/api/${operation}`;

      // Pass the entire body or construct the expected object
      await axios.post(webhookUrl, { type, market, price, volume });

      res.status(200).json({ message: "Buy/Sell Success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "허용되지 않은 메소드" });
  }
}
