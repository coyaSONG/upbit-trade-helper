import axios from 'axios';
import queryEncode from 'querystring';

interface props {
  url: string;
  qs: any;
  token: string;
  method: 'POST' | 'PUT' | 'DELETE' | 'GET';
}

export async function request({ url, qs, token, method }: props) {
  const query = queryEncode.encode(qs);

  let options = {
    method: method,
    url: url,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token,
    },
    ...(method === 'POST' ? { data: qs } : { params: qs }),
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error('Network or other error');
    }
  }
}
