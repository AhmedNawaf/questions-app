import { createVote } from '@/src/models/post';
import { auth, ModifiedRequest } from '@/src/utils/auth';
import { NextApiResponse } from 'next';

async function handler(req: ModifiedRequest, res: NextApiResponse) {
  const user_id = req.user.id;
  const { post } = req.body as { post: number };
  await createVote({
    post_id: post,
    user_id,
  });
  res.status(200).json({});
}

export default auth(handler);
