import { createAnswer } from '@/src/models/post';
import { auth, ModifiedRequest } from '@/src/utils/auth';
import { NextApiResponse } from 'next';

async function handler(req: ModifiedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({});

  const user_id = req.user.id;

  const { content, question } = req.body as {
    content: string;
    question: number;
  };
  await createAnswer({
    content,
    type: 'answer',
    parent_id: question,
    user_id,
  });

  res.status(201).json({});
}

export default auth(handler);
