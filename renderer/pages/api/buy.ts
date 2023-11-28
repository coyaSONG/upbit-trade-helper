import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { useApiConfig } from '@hooks/useApiConfig';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { server_url, token } = useApiConfig();
  const { market, volume } = req.body;

  try {
    const response = await axios.post(
      `${server_url}/v1/orders`,
      {
        market,
        side: 'bid',
        volume,
        ord_type: 'limit',
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while buying' });
  }
};