import { signJwt } from '@/src/models/user';
import { prisma } from '@/src/utils/db';
import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createCookie } from '@/src/utils/helpers';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(500).json({
      message: 'Wrong Method',
    });
  }
  const { name, email, password } = req.body;
  try {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: await hash(password, 10),
      },
    });
    const token = signJwt(user.id);
    res.setHeader('Set-Cookie', createCookie(token));
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({});
  }
}
