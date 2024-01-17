import {
  makeStyles,
  Typography,
  Container,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

export default function Footer() {
  const classes = {
    footer: {
      marginTop: 'auto',
      borderTop: '1px solid #e0e0e0',
      backgroundColor: '#FFF',
      padding: '30px',
    },
  };
  return (
    <footer style={classes.footer}>
      <Container maxWidth='sm'>
        <Typography
          variant='body2'
          color='textSecondary'
          align='center'
        >
          <FormattedMessage id='copyright' />{' '}
          <MuiLink
            href='/'
            passHref
            component={Link}
          >
            <FormattedMessage id='app.name' />
          </MuiLink>
        </Typography>
      </Container>
    </footer>
  );
}
