import { NextApiRequest, NextApiResponse } from 'next';
import { useApiConfig } from '@hooks/useApiConfig';
const request = require('request');

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { server_url, token } = useApiConfig();

  const options = {
    url: server_url + "/v1/accounts",
    headers: { Authorization: `Bearer ${token}` },
  };

  request(options, (error: any, response: any, body: any) => {
    if (error) {
      res.status(500).json({ error: 'An error occurred while fetching account info' });
    } else {
      res.status(200).json(JSON.parse(body));
    }
  });
};