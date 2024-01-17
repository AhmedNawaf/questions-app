import { usePosts } from '@/src/hooks/usePost';
import MainLayout from '@/src/layouts/Main';
import QList from '@/src/components/QItem';
import Pages from '@/src/components/Pagination';
import { Button, Box, Typography, useTheme } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { prisma } from '@/src/utils/db';
import { tags } from '@prisma/client';
// import Tag from 'models/tag'
// import dbConnect from 'utils/dbConnect'

export default function Show({ params: tag }: { params: tags }) {
  const theme = useTheme();
  const classes = {
    titleContainer: {
      display: 'flex',
      padding: theme.spacing(2),
      background: '#f4f7f9',
    },
    title: {
      flexGrow: 1,
    },
  };
  const router = useRouter();
  const page = router.query.page || 1;
  const { data } = usePosts({ page: Number(page), tag: tag.id });
  if (!data) return <Box>Loading ...</Box>;
  return (
    <MainLayout>
      <Head>
        <title>{tag?.name}</title>
      </Head>
      <Box sx={classes.titleContainer}>
        <Typography
          variant='h5'
          sx={classes.title}
        >
          {tag?.name}
        </Typography>
        <Box marginY={'auto'}>
          <Link
            href={'/question/ask'}
            passHref
          >
            <Button
              color={'secondary'}
              variant={'contained'}
              disableElevation
              size='small'
            >
              <FormattedMessage id='btn.ask' />
            </Button>
          </Link>
        </Box>
      </Box>
      <QList posts={data.posts} />
      <Pages
        totalPages={data.totalPages}
        currentPage={Number(page)}
      />
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const items = await prisma.tags.findMany();
  const paths = items.map((e) => ({ params: { slug: e.slug.toString() } }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  let item = await prisma.tags.findFirst({ where: { slug: params.slug } });
  return {
    props: {
      params: JSON.parse(JSON.stringify(item)),
    },
  };
}
