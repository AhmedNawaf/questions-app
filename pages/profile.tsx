import { FormEvent, useEffect, useState } from 'react';
// Next.js
import Head from 'next/head';
// Components
import { Alert, Button, Grid, useTheme } from '@mui/material';
import MainLayout from '@/src/layouts/Main';
import { TextInput } from '@/src/components/inputs';
import { FormattedMessage } from 'react-intl';
// Hooks
import useAuth from '@/src/hooks/useAuth';
import { updateProfile, updatePassword } from '@/src/hooks/useUser';

export default function Profile() {
  const theme = useTheme();
  const classes = {
    form: {
      margin: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
    alert: {
      marginBottom: theme.spacing(2),
    },
  };

  const [profileData, setProfileData] = useState({ name: '', email: '' });
  const [passwordData, setPasswordData] = useState({
    password: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState({ profile: false, password: false });
  const [error, setError] = useState({ profile: false, password: false });

  const { user } = useAuth({
    redirectTo: '/login',
    redirectIfFound: false,
  });

  useEffect(() => {
    if (!user) return;
    const { name, email } = user;
    setProfileData({ name, email });
  }, [user]);

  const onSubmitProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading({ ...loading, profile: true });
    try {
      await updateProfile(profileData);
      setError({ ...error, profile: false });
    } catch (e) {
      setError({ ...error, profile: true });
    }
    setLoading({ ...loading, profile: false });
  };

  const onSubmitPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading({ ...loading, password: true });
    try {
      await updatePassword(passwordData);
      setError({ ...error, password: false });
    } catch (e) {
      setError({ ...error, password: true });
    }
    setLoading({ ...loading, password: false });
  };

  return (
    <MainLayout title='title.profile'>
      {/* <Head>
        <title>الملف الشخصي</title>
      </Head> */}

      <Grid container>
        <Grid
          item
          md={6}
          xs={12}
        >
          {user && (
            <form
              style={classes.form}
              onSubmit={onSubmitProfile}
            >
              <TextInput
                required
                label='input.name'
                value={profileData?.name}
                name='profile-name'
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
              />

              <TextInput
                required
                label='input.email'
                value={profileData?.email}
                type='email'
                name='profile-email'
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
              {error.profile && (
                <Alert
                  severity='error'
                  sx={classes.alert}
                >
                  <FormattedMessage id='error.update_profile' />
                </Alert>
              )}
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={loading.profile}
              >
                <FormattedMessage id={'btn.save'} />
              </Button>
            </form>
          )}
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          {user && (
            <form
              style={classes.form}
              onSubmit={onSubmitPassword}
            >
              <TextInput
                required
                label='input.current_password'
                type='password'
                name='profile-password'
                onChange={(e) =>
                  setPasswordData({ ...passwordData, password: e.target.value })
                }
              />

              <TextInput
                required
                label='input.new_password'
                type='password'
                name='profile-newPassword'
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />
              {error.password && (
                <Alert
                  severity='error'
                  sx={classes.alert}
                >
                  <FormattedMessage id='error.update_password' />
                </Alert>
              )}
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={loading.password}
              >
                <FormattedMessage id={'btn.change_password'} />
              </Button>
            </form>
          )}
        </Grid>
      </Grid>
    </MainLayout>
  );
}
