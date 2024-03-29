import { usePosts } from '@/src/hooks/usePost';
import MainLayout from '@/src/layouts/Main';
import QList from '@/src/components/QItem';
import Pages from '@/src/components/Pagination';
import {
  makeStyles,
  ButtonGroup,
  Button,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
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
  const sort = router.query.sort;

  const { data, isLoading } = usePosts({
    page: Number(page),
    sort: sort === 'asc' ? 'asc' : 'desc',
  });
  if (isLoading) return <Box>Loading ...</Box>;
  return (
    <MainLayout>
      <Box sx={classes.titleContainer}>
        <Typography
          variant='h5'
          sx={classes.title}
        >
          <Filters />
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
      <QList posts={data?.posts} />
      <Pages
        totalPages={data?.totalPages}
        currentPage={Number(page)}
      />
    </MainLayout>
  );
}

function Filters() {
  const router = useRouter();
  const navigate = (sort: 'asc' | 'desc') => {
    router.push({
      pathname: '/',
      query: { ...router.query, sort },
    });
  };
  return (
    <ButtonGroup size='small'>
      <Button onClick={() => navigate('desc')}>
        <FormattedMessage id={'btn.newest'} />
      </Button>
      <Button onClick={() => navigate('asc')}>
        <FormattedMessage id={'btn.oldest'} />
      </Button>
    </ButtonGroup>
  );
}
