import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/src/utils/db';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      {
        const tags = await prisma.tags.findMany();
        res.status(200).json({
          data: tags,
        });
      }

      break;
    case 'POST': {
      const { name, description } = req.body as {
        name: string;
        slug: string;
        description: string;
      };
      const tag = await prisma.tags.create({
        data: {
          name,
          slug: name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, ''),
          description,
        },
      });
      res.status(201).json({
        data: tag,
      });
      break;
    }
    default:
      res.status(405).json({});
      break;
  }
};

export default handler;
