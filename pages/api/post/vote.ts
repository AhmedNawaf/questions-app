import { createVote } from '@/src/models/post';
import { auth, ModifiedRequest } from '@/src/utils/auth';
import { VOTE_TYPE } from '@prisma/client';
import { NextApiResponse } from 'next';

async function handler(req: ModifiedRequest, res: NextApiResponse) {
  const user_id = req.user.id;
  const { post, type } = req.body as { post: number; type: VOTE_TYPE };
  await createVote({
    post_id: post,
    user_id,
    type,
  });
  res.status(200).json({});
}

export default auth(handler);
