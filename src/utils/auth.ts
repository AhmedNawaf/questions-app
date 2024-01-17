import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import type { users } from '@prisma/client';
import { prisma } from './db';

const jwtSecret = process.env.JWT_SECRET || 'some-secret';

type User = Omit<users, 'password'>;

export interface ModifiedRequest extends NextApiRequest {
  user: User;
}

type ModifiedHandler = (req: ModifiedRequest, res: NextApiResponse) => void;

async function check(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = req.cookies;
  if (!accessToken) throw new Error('Unauthorized');
  const { id } = jwt.verify(accessToken, jwtSecret) as users;

  if (id) {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (user) return user;
  }
  throw new Error();
}

export const auth =
  (handler: ModifiedHandler) =>
  async (req: ModifiedRequest, res: NextApiResponse) => {
    try {
      req.user = await check(req, res);
      return handler(req, res);
    } catch (error) {
      res.status(401).json({});
    }
  };
