import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log('트레이딩뷰 웹훅 데이터:', req.body);

    // TODO
    // 매수 매도 로직을 api로 구현해서 훅에서 온 데이터 신호(buy or sell)에 따라 동작

    res.status(200).json({ message: '웹훅 데이터 수신 성공' });
  } else {
    res.status(405).json({ message: '허용되지 않은 메소드' });
  }
}
