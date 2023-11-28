import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log('트레이딩뷰 웹훅 데이터:', req.body);

    // TODO
    // 매수 매도 로직을 api로 구현해서 훅에서 온 데이터 신호(buy or sell)에 따라 동작
    // req.body의 값이 BUY라는 텍스트로 시작하면 매수 로직
    if (req.body.startsWith('BUY')) {
      console.log('매수 로직 실행');
    }

    // SELL 텍스트로 시작하면 매도 로직
    if (req.body.startsWith('SELL')) {
      console.log('매도 로직 실행');
    }

    res.status(200).json({ message: 'good' });
  } else {
    res.status(405).json({ message: 'bad' });
  }
}
