import AuthLayout from '@/src/layouts/Auth';
import {
  Alert,
  Typography,
  Avatar,
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
import { useState } from 'react';
import { register } from '@/src/hooks/useAuth';

export default function Register() {
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await register({ name, email, password });
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
        <FormattedMessage id={'title.register'} />
      </Typography>
      {hasError && (
        <Box marginTop={2}>
          <Alert severity='error'>
            <FormattedMessage id={'error.register'} />
          </Alert>
        </Box>
      )}
      <form
        style={classes.form}
        onSubmit={onSubmit}
      >
        <TextInput
          required
          label='input.name'
          autoComplete='name'
          name='name'
          onChange={(e) => setName(e.target.value)}
        />
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
          <FormattedMessage id={'btn.send'} />
        </Button>
        <Box marginTop={2}>
          <HaveAccount />
        </Box>
      </form>
    </AuthLayout>
  );
}

function HaveAccount() {
  return (
    <Typography align='center'>
      <MuiLink
        href='/login'
        component={Link}
        passHref
      >
        <FormattedMessage id={'haveAccount'} />
      </MuiLink>
    </Typography>
  );
}
