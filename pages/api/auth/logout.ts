import { createCookie } from '@/src/utils/helpers';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', createCookie('', { expired: true }));
  res.status(200).json({ success: true, message: 'Successful Logout' });
}
