import { prisma } from '@/src/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { comparePassword, signJwt } from '@/src/models/user';
import { createCookie } from '@/src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(400).json({});
  }
  const { email, password } = req.body;
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (!user) return res.json({ success: false, message: 'User not found' });
  if (!comparePassword(password, user.password)) {
    return res.status(400).json({});
  }
  const token = signJwt(user.id);
  res.setHeader('Set-Cookie', createCookie(token));
  res.status(200).json({
    success: true,
    message: 'Successful Login',
  });
}
