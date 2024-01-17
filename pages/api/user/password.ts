import { comparePassword, updateUser } from '@/src/models/user';
import { auth, ModifiedRequest } from '@/src/utils/auth';
import { prisma } from '@/src/utils/db';
import { NextApiResponse } from 'next';

const handler = async (req: ModifiedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(400).json({});

  const { password, newPassword } = req.body as {
    password: string;
    newPassword: string;
  };
  const user = await prisma.users.findUnique({ where: { id: req.user.id } });
  if (!user) throw new Error();
  if (await comparePassword(password, user.password)) {
    await updateUser(req.user.id, { password: newPassword });
    return res.status(200).json({});
  }
  res.status(400).json({});
};

export default auth(handler);
