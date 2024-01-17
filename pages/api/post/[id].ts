import { getPostById } from '@/src/models/post';
import { NextApiRequest, NextApiResponse } from 'next';

export type PostData = Awaited<ReturnType<typeof getPostById>>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const post = await getPostById(Number(id));
  return res.json({
    success: true,
    message: 'Data Generated',
    data: { ...post },
  });
}
