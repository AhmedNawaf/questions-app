import { updateUser } from '@/src/models/user';
import { auth, ModifiedRequest } from '@/src/utils/auth';
import { NextApiResponse } from 'next';

const handler = async (req: ModifiedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(400).json({});
  const { name, email } = req.body as { name: string; email: string };
  try {
    await updateUser(req.user.id, { name, email });
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({});
  }
};

export default auth(handler);
