import { auth, ModifiedRequest } from '@/src/utils/auth';
import { NextApiResponse } from 'next';

async function handler(req: ModifiedRequest, res: NextApiResponse) {
  const { id, name, email } = req.user;
  res.status(200).json({
    data: {
      id,
      name,
      email,
    },
  });
}

export default auth(handler);
