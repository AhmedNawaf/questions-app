import { auth, ModifiedRequest } from '@/src/utils/auth';
import { prisma } from '@/src/utils/db';
import { NextApiResponse } from 'next';

async function handler(req: ModifiedRequest, res: NextApiResponse) {
  const user_id = req.user.id;
  const { question, answer } = req.body as { question: number; answer: number };
  // const post = await Post.findOne({_id: question, parent: null})
  const post = await prisma.posts.findUnique({
    where: { id: question, parent_id: null },
  });
  if (!post) throw new Error();
  if (post.user_id !== user_id) return res.status(403).json({});

  await prisma.posts.updateMany({
    where: {
      parent_id: question,
    },
    data: {
      accepted: false,
    },
  });
  await prisma.posts.updateMany({
    where: {
      parent_id: question,
      id: answer,
    },
    data: {
      accepted: true,
    },
  });
  res.status(200).json({});
}

export default auth(handler);
