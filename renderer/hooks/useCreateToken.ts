import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import querystring from 'querystring';
import { v4 as uuidv4 } from 'uuid';

export default function useApiConfig() {
  const server_url = process.env.NEXT_PUBLIC_UPBIT_OPEN_API_SERVER_URL;
  const access_key = process.env.NEXT_PUBLIC_UPBIT_OPEN_API_ACCESS_KEY;
  const secret_key = process.env.NEXT_PUBLIC_UPBIT_OPEN_API_SECRET_KEY;

  const createToken = (params?: any) => {
    const payload: any = {
      access_key: access_key,
      nonce: uuidv4(),
    };

    console.log('@@payload', payload);

    if (params) {
      const query = querystring.encode(params);
      const hash = crypto.createHash('sha512');
      const queryHash = hash.update(query, 'utf-8').digest('hex');

      payload.query_hash = queryHash;
      payload.query_hash_alg = 'SHA512';
    }

    const jwtToken = jwt.sign(payload, secret_key);
    const authorizationToken = `Bearer ${jwtToken}`;

    return authorizationToken;
  };

  return { server_url, createToken };
}
