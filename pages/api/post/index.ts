import { getPosts } from '@/src/models/post';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, sort, tag } = req.query;
  const currentPage = page ? Number(page) : 1;
  const posts = await getPosts({
    sort: sort === 'asc' ? 'asc' : 'desc',
    page: currentPage - 1,
    tag: tag ? Number(tag) : undefined,
  });
  return res.json({
    success: true,
    message: 'Data Generated',
    data: posts,
  });
}
