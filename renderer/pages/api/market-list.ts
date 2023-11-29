import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get("https://api.upbit.com/v1/market/all", {
      params: { isDetails: "false" },
      headers: { accept: "application/json" },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
