import React, { useEffect, useState } from 'react';
import MainLayout from '@/src/layouts/Main';
// import dbConnect from 'utils/dbConnect'
// import Post from 'models/post'
import Head from 'next/head';
import Router from 'next/router';
import usePost from '@/src/hooks/usePost';
import useAuth from '@/src/hooks/useAuth';
import { Content, Tags, Vote } from '@/src/components/question';
import { Editor } from '@/src/components/inputs';
import {
  Box,
  Avatar,
  Typography,
  Divider,
  Button,
  useTheme,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import moment from '@/src/utils/moment';
import { $Enums, tags, users } from '@prisma/client';
import { PostData } from '../api/post/[id]';
import { prisma } from '@/src/utils/db';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export default function Show({ params }: { params: { id: number } }) {
  useEffect(() => {
    if (!params?.id) Router.push('/404');
  }, [params]);

  const { data: post, loading, answer, vote } = usePost(params?.id);

  useEffect(() => {
    if (post?.question.title === null) Router.push('/404');
  }, [post]);
  const { user } = useAuth({});
  if (!post) return null;
  return (
    <MainLayout
      // @ts-expect-error
      title={post.question.title}
      loading={loading}
    >
      <Head>
        <title>{post?.question?.title}</title>
      </Head>
      <Box
        display='flex'
        m={2}
      >
        <Vote
          totalVotes={post.totalVotes}
          vote={(type) => vote(post.question.id, type)}
        />
        <Content html={post.question.content} />
      </Box>
      <QuestionFooter
        user={post.question.user.name}
        tags={post.tags || []}
      />
      <Answers
        items={post.answers}
        vote={vote}
      />
      {user && <AnswerForm answer={answer} />}
    </MainLayout>
  );
}

function QuestionFooter({ user, tags }: { user: users['name']; tags: tags[] }) {
  return (
    <Box
      display='flex'
      m={2}
    >
      <Box
        flexGrow={1}
        display='flex'
      >
        <Avatar>{user.charAt(0)}</Avatar>
        <Box
          marginY={'auto'}
          marginX={1}
        >
          {user}
        </Box>
      </Box>
      <Box
        marginY={'auto'}
        display='flex'
      >
        <Tags items={tags} />
      </Box>
    </Box>
  );
}

function Answer({
  data: { id, content, user, created_at, totalVotes },
  vote,
}: {
  data: ArrayElement<PostData['answers']>;
  vote: (id: number | undefined, type: $Enums.VOTE_TYPE) => void;
}) {
  return (
    <Box p={2}>
      <Box display='flex'>
        <Vote
          totalVotes={totalVotes}
          vote={(type) => vote(id, type)}
        />
        <Content html={content} />
      </Box>
      <Box
        display='flex'
        marginTop={2}
      >
        <Avatar>{user.name.charAt(0)}</Avatar>
        <Box
          marginY={'auto'}
          marginX={1}
          flexGrow={1}
        >
          {user.name}
        </Box>
        <Typography
          variant='caption'
          display='block'
          marginY={'auto'}
        >
          {moment(created_at).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
}

function Answers({
  items,
  vote,
}: {
  items: PostData['answers'];
  vote: (id: number | undefined, type: $Enums.VOTE_TYPE) => Promise<void>;
}) {
  const theme = useTheme();
  const classes = {
    answersTitle: {
      background: '#f4f7f9',
      padding: theme.spacing(2),
    },
  };

  return (
    <>
      <Box sx={classes.answersTitle}>
        <Typography variant='h6'>
          <FormattedMessage id='post.answers' />
        </Typography>
      </Box>
      <Divider />
      {items.map((answer) => {
        return (
          <>
            <Answer
              data={answer}
              vote={vote}
            />
            <Divider />
          </>
        );
      })}
    </>
  );
}

function AnswerForm({
  answer,
}: {
  answer: (params: { content: string }) => Promise<void>;
}) {
  const theme = useTheme();
  const classes = {
    answerForm: {
      '& > *': {
        margin: theme.spacing(0, 0, 2, 0),
      },
      background: '#f4f7f9',
    },
  };

  const [content, setContent] = useState('');
  const handleSubmit = async () => {
    await answer({ content });
    setContent('');
  };
  return (
    <Box
      p={2}
      sx={classes.answerForm}
    >
      <Box>
        <Editor
          content={content}
          setContent={setContent}
        />
      </Box>
      <Button
        color='primary'
        variant='contained'
        onClick={handleSubmit}
      >
        <FormattedMessage id='btn.share' />
      </Button>
    </Box>
  );
}

export async function getStaticPaths() {
  const items = await prisma.posts.findMany({ where: { parent_id: null } });
  const paths = items.map((e) => ({ params: { id: e.id.toString() } }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: number } }) {
  const item = await prisma.posts.findUnique({
    where: { id: Number(params.id) },
  });
  return {
    props: {
      params: JSON.parse(JSON.stringify(item)),
    },
  };
}
