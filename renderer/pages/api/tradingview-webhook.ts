import type { NextApiRequest, NextApiResponse } from "next";
import { ipcMain } from "electron";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const message = req.body.message;

    console.log("트레이딩뷰 웹훅 데이터:", req.body);

    res.status(200).json({ message: "메시지가 전달되었습니다." });
  } else {
    res.status(405).json({ message: "허용되지 않은 메소드" });
  }
}
