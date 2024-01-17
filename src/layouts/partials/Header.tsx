import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Link,
} from '@mui/material';
import NextLink from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import useAuth from '@/src/hooks/useAuth';
import { users } from '@prisma/client';

export default function Header() {
  const classes = {
    title: {
      flexGrow: 1,
      cursor: 'pointer',
      color: 'white',
    },
  };
  const { user, logout } = useAuth({});
  return (
    <AppBar
      position='static'
      variant='outlined'
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link
          href='/'
          component={NextLink}
        >
          <Typography
            variant='h6'
            sx={classes.title}
          >
            <FormattedMessage id='app.name' />
          </Typography>
        </Link>
        {user ? (
          <UserMenu
            user={user}
            logout={logout}
          />
        ) : (
          <GuestMenu />
        )}
      </Toolbar>
    </AppBar>
  );
}

function GuestMenu() {
  return (
    <Link href='/login'>
      <Button
        color='primary'
        variant='contained'
      >
        <FormattedMessage id={'header.login'} />
      </Button>
    </Link>
  );
}

function UserMenu({
  user,
  logout,
}: {
  user: Omit<users, 'password'>;
  logout: () => Promise<void>;
}) {
  const router = useRouter();
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setMenu(event.currentTarget);
  const handleClose = () => setMenu(null);

  const handleLogout = async () => {
    setMenu(null);
    await logout();
    router.reload();
  };

  return (
    <div>
      {user?.name}
      <IconButton
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <Avatar>{user.name?.charAt(0)}</Avatar>
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={menu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        open={Boolean(menu)}
        onClose={handleClose}
      >
        <Link href='/profile'>
          <MenuItem>
            <FormattedMessage id='header.profile' />
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <FormattedMessage id='header.logout' />
        </MenuItem>
      </Menu>
    </div>
  );
}
