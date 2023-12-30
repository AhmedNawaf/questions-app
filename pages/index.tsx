import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';

export default function Home() {
  return (
    <Button color='primary'>
      <FormattedMessage id='app.name' />
    </Button>
  );
}
