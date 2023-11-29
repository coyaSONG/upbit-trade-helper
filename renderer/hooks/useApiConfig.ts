import { v4 as uuidv4 } from 'uuid';
const sign = require('jsonwebtoken').sign;

export const useApiConfig = () => {
  const access_key = process.env.NEXT_PUBLIC_UPBIT_OPEN_API_ACCESS_KEY;
  const secret_key = process.env.NEXT_PUBLIC_UPBIT_OPEN_API_SECRET_KEY;
  const server_url = process.env.NEXT_PUBLIC_UPBIT_OPEN_API_SERVER_URL;

  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
  };

  const token = sign(payload, secret_key);

  return { server_url, token };
};

export default useApiConfig;