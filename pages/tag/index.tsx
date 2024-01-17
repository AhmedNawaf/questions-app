// Next.js
import Link from 'next/link';
import Head from 'next/head';
// Components
import MainLayout from '@/src/layouts/Main';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
// Hooks
import { useTags } from '@/src/hooks/useTag';

export default function Tags() {
  const theme = useTheme();
  const classes = {
    container: {
      padding: theme.spacing(3),
    },
    card: {
      height: 170,
    },
  };

  const { data: tags } = useTags();

  return (
    <MainLayout title={'title.tags'}>
      <Head>
        <title>التصنيفات</title>
      </Head>

      <Grid
        container
        spacing={3}
        sx={classes.container}
      >
        {tags.map(({ name, slug, description }, index) => (
          <Grid
            item
            sm={4}
            xs={6}
            key={index}
          >
            <Link
              passHref
              href={`tag/${slug}`}
            >
              <Card variant='outlined'>
                <CardActionArea>
                  <CardContent sx={classes.card}>
                    <Typography
                      variant='h6'
                      color='primary'
                    >
                      {name}
                    </Typography>
                    <Typography variant='body2'>{description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
}
