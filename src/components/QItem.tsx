import React from 'react';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Chip,
} from '@mui/material';
import { lightGreen } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import moment from '@/src/utils/moment';
import { tags } from '@prisma/client';
import { PostsData } from '@/pages/api/post';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

interface Props {
  post: ArrayElement<PostsData['posts']>;
}

function QItem({ post }: Props) {
  const theme = useTheme();

  const classes = {
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    tags: {
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    answers: {
      color: theme.palette.getContrastText(lightGreen[300]),
      backgroundColor: lightGreen[300],
    },
    link: {
      cursor: 'pointer',
    },
  };
  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <Avatar
          variant='rounded'
          sx={classes.answers}
        >
          {post.answersCount || 0}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Link
            href={`/question/${post.id}`}
            passHref
          >
            <Typography sx={classes.link}>{post.title}</Typography>
          </Link>
        }
        secondary={
          <Box display='flex'>
            <Box
              paddingY={1}
              flexGrow={1}
              sx={classes.tags}
            >
              <Tags tags={post.tags} />
            </Box>
            <Box marginY={'auto'}>{moment(post.created_at).fromNow()}</Box>
          </Box>
        }
      />
    </ListItem>
  );
}

function Tags({ tags }: { tags: tags[] }) {
  return tags.map((e) => (
    <Link
      href={`/tag/${e.slug}`}
      passHref
      key={e.id}
    >
      <Chip
        label={e.name}
        color='secondary'
        size='small'
      />
    </Link>
  ));
}

export default function QList({ posts }: { posts?: PostsData['posts'] }) {
  return (
    <List>
      {posts?.map((e, index) => (
        <div key={index}>
          <QItem post={e} />
          <Divider
            variant='inset'
            component='li'
          />
        </div>
      ))}
    </List>
  );
}
