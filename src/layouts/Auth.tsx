import {
  Container,
  CssBaseline,
  Paper,
  Box,
  Typography,
  Link as MuiLink,
  Breakpoint,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import useAuth from '@/src/hooks/useAuth';

interface Props {
  children: React.ReactNode;
  width?: Breakpoint;
}

export default function Auth({ children, width = 'xs' }: Props) {
  useAuth({
    redirectTo: '/',
    redirectIfFound: true,
  });
  const theme = useTheme();
  const classes = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'url("images/bg/login.jpg")',
    },
    paper: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  };
  return (
    <Box sx={classes.root}>
      <Container
        component='main'
        maxWidth={width}
      >
        <CssBaseline />
        <Paper sx={classes.paper}>
          {/* start: Content */}
          {children}
          {/* end: Content */}
          {/* start: Copyright */}
          <Box mt={5}>
            <Typography
              variant='body2'
              color='textSecondary'
              align='center'
            >
              <FormattedMessage id='copyright' />{' '}
              <MuiLink
                href='/'
                component={Link}
              >
                <FormattedMessage id='app.name' />
              </MuiLink>
            </Typography>
          </Box>
          {/* end: Copyright */}
        </Paper>
      </Container>
    </Box>
  );
}
