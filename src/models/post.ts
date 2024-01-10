import { prisma } from '../utils/db';
import { posts } from '@prisma/client';

type CreateQuestion = Pick<
  posts,
  'user_id' | 'type' | 'title' | 'content' | 'tags'
>;

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
  const result = await prisma.posts.findMany({
    take: pageSize,
    skip: page * pageSize,
    where: {
      tags: tag
        ? {
            has: tag,
          }
        : undefined,
      type: {
        equals: 'question',
      },
    },
    orderBy: {
      created_at: sort,
    },
  });
  return result;
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
      _count: {
        select: {
          votes: true,
        },
      },
    },
  });
  if (!post) throw Error('Not Found');
  const [tags, answers] = await Promise.all([
    await prisma.tags.findMany({ where: { id: { in: post?.tags } } }),
    await prisma.posts.findMany({ where: { parent_id: post.id } }),
  ]);
  const question = { ...post, tags };
  return {
    question,
    answers,
    totalVotes: post._count.votes,
  };
}

export async function createQuestion({ user_id, ...data }: CreateQuestion) {
  const result = await prisma.posts.create({
    data: {
      ...data,
      user: {
        connect: { id: user_id },
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
}: {
  post_id: number;
  user_id: number;
}) {
  await prisma.post_user_votes.upsert({
    create: {
      user: { connect: { id: user_id } },
      post: { connect: { id: post_id } },
    },
    update: {},
    where: {
      user_id_post_id: {
        post_id,
        user_id,
      },
    },
  });
}
