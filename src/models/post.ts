import { prisma } from '../utils/db';
import type { posts, Prisma, VOTE_TYPE } from '@prisma/client';
6;
type CreateQuestion = Pick<posts, 'user_id' | 'type' | 'title' | 'content'> & {
  tags: number[];
};

type CreateAnswer = Omit<CreateQuestion, 'title' | 'tags'> & {
  parent_id: number;
};

const pageSize = 10;

interface PostOptions {
  sort: 'asc' | 'desc';
  page: number;
  tag?: number;
}

export async function getPosts({ page, tag, sort = 'desc' }: PostOptions) {
  const query: Prisma.postsFindManyArgs = {
    where: {
      tags: tag ? { some: { tag_id: tag } } : undefined,
      type: {
        equals: 'question',
      },
    },
  };
  const [result, totalPages] = await prisma.$transaction([
    prisma.posts.findMany({
      where: query.where,
      orderBy: {
        created_at: sort,
      },
      include: {
        _count: {
          select: { answers: true },
        },
        tags: {
          include: { tag: true },
        },
      },
      take: pageSize,
      skip: page * pageSize,
    }),
    prisma.posts.count({ where: query.where }),
  ]);
  return {
    posts: result.map(({ _count, tags, ...rest }) => ({
      answersCount: _count.answers,
      tags: tags.map(({ tag }) => tag),
      ...rest,
    })),
    totalPages: Math.ceil(totalPages / pageSize),
  };
}

export async function getPostById(id: number) {
  // Get the post including the user and the tags
  // Get the answers also
  const post = await prisma.posts.findUnique({
    where: {
      id,
    },
    include: {
      user: { select: { name: true } },
      votes: true,
      tags: {
        include: {
          tag: true,
        },
      },
      answers: {
        include: {
          votes: {
            select: {
              type: true,
            },
          },
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      },
    },
  });
  if (!post) throw Error('Not Found');

  return {
    question: post,
    tags: post.tags.map(({ tag }) => tag),
    answers: post.answers.map(({ votes, ...rest }) => ({
      totalVotes: (() => {
        let total = 0;
        for (const vote of votes) {
          total += vote.type === 'up_vote' ? 1 : -1;
        }
        return total;
      })(),
      ...rest,
    })),
    totalVotes: (() => {
      let total = 0;
      for (const vote of post.votes) {
        total += vote.type === 'up_vote' ? 1 : -1;
      }
      return total;
    })(),
  };
}

export async function createQuestion({
  user_id,
  tags,
  ...data
}: CreateQuestion) {
  const result = await prisma.posts.create({
    data: {
      ...data,
      user: {
        connect: { id: user_id },
      },
      tags: {
        createMany: {
          data: tags.map((tag) => ({ tag_id: tag })),
        },
      },
    },
  });
  return result;
}

export async function createAnswer({
  parent_id,
  user_id,
  ...data
}: CreateAnswer) {
  const result = await prisma.posts.create({
    data: {
      ...data,
      parent: { connect: { id: parent_id } },
      user: { connect: { id: user_id } },
    },
  });
  return result;
}

export async function createVote({
  post_id,
  user_id,
  type,
}: {
  post_id: number;
  user_id: number;
  type: VOTE_TYPE;
}) {
  await prisma.post_user_votes.upsert({
    create: {
      user: { connect: { id: user_id } },
      post: { connect: { id: post_id } },
      type,
    },
    update: {
      type,
    },
    where: {
      user_id_post_id: {
        post_id,
        user_id,
      },
    },
  });
}
