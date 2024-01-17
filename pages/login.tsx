import AuthLayout from '@/src/layouts/Auth';
import {
  Alert,
  Typography,
  Avatar,
  makeStyles,
  Button,
  Box,
  Link as MuiLink,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { FormattedMessage } from 'react-intl';
import { TextInput } from '@/src/components/inputs';
import { FormEvent, useState } from 'react';
import { login } from '@/src/hooks/useAuth';

export default function Login() {
  const theme = useTheme();
  const classes = {
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      marginTop: theme.spacing(3),
    },
  };
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await login({ email, password });
      router.push('/');
    } catch (e) {
      setHasError(true);
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Avatar sx={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography
        component='h1'
        variant='h5'
      >
        <FormattedMessage id={'title.login'} />
      </Typography>
      {hasError && (
        <Box marginTop={2}>
          <Alert severity='error'>
            <FormattedMessage id={'error.login'} />
          </Alert>
        </Box>
      )}
      <form
        style={classes.form}
        onSubmit={onSubmit}
      >
        <TextInput
          required
          label='input.email'
          type='email'
          autoComplete='email'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          required
          label='input.password'
          type='password'
          autoComplete='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          disabled={loading}
        >
          <FormattedMessage id={'btn.continue'} />
        </Button>
        <Box marginTop={2}>
          <NoAccount />
        </Box>
      </form>
    </AuthLayout>
  );
}

function NoAccount() {
  return (
    <Typography align='center'>
      <MuiLink
        component={Link}
        href='/register'
        passHref
      >
        <FormattedMessage id={'dontHaveAccount'} />
      </MuiLink>
    </Typography>
  );
}
