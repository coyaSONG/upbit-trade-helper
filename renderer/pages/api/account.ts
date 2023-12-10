import useApiConfig from '@hooks/useCreateToken';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { createToken } = useApiConfig();

  const options = {
    method: 'GET',
    url: 'https://api.upbit.com/v1/accounts',
    headers: { accept: 'application/json', Authorization: createToken() },
  };

  axios
    .request(options)
    .then(function (response) {
      res.status(200).json(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      res.status(500).json({ error });
      console.error(error);
    });
};
