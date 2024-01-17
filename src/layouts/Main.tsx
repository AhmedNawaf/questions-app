import {
  Container,
  Paper,
  Box,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import Footer from './partials/Footer';
import Header from './partials/Header';
import { FormattedMessage } from 'react-intl';

interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function Main({ children, title }: Props) {
  const theme = useTheme();
  const classes = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    container: {
      flexGrow: 1,
      display: 'flex',
      padding: 0,
    },
    title: {
      padding: theme.spacing(2),
      background: theme.palette.background.default,
    },
    content: {
      flexGrow: 1,
      borderBottom: 'none',
    },
  };
  return (
    <Box sx={classes.root}>
      <Header />
      <Container
        maxWidth='lg'
        component='main'
        sx={classes.container}
      >
        <Paper
          square
          variant='outlined'
          sx={classes.content}
        >
          {title && (
            <>
              <Box sx={classes.title}>
                <Typography variant='h5'>
                  <FormattedMessage
                    id={title}
                    defaultMessage={title}
                  />
                </Typography>
              </Box>
              <Divider />
            </>
          )}
          {children}
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}
