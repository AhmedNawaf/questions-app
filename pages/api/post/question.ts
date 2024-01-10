import { createQuestion } from '@/src/models/post';
import { auth, ModifiedRequest } from '@/src/utils/auth';
import { NextApiResponse } from 'next';

async function handler(req: ModifiedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({});

  const user_id = req.user.id;

  const { title, content, tags } = req.body as {
    title: string;
    content: string;
    tags: number[];
  };

  const question = await createQuestion({
    title,
    content,
    type: 'question',
    user_id,
    tags,
  });

  res.status(201).json({
    data: {
      id: question.id,
    },
  });
}

export default auth(handler);
