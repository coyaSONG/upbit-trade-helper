import useApiConfig from '@hooks/useCreateToken';
import { request } from './request';

export async function order(
  market: string,
  volume: string,
  price: string,
  side: 'bid' | 'ask',
  ord_type: 'limit' | 'price' | 'market'
) {
  const { createToken, server_url } = useApiConfig();
  const url = `${server_url}/v1/orders`;

  const qs = {
    market: market,
    side: side,
    volume: volume,
    price: price,
    ord_type: ord_type,
  };

  const token = createToken(qs);

  return await request({
    url: url,
    qs: qs,
    token: token,
    method: 'POST',
  });
}
