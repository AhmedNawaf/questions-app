import React from 'react';
import {
  TextField,
  FormControl,
  useTheme,
  TextFieldProps,
} from '@mui/material';
import { useIntl } from 'react-intl';

type Props = Omit<TextFieldProps, 'onChange'> & {
  name: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export default function TextInput({
  name,
  label,
  onChange,
  variant = 'filled',
  ...props
}: Props) {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  return (
    <FormControl
      fullWidth
      sx={{ marginBottom: theme.spacing() }}
    >
      <TextField
        variant={variant}
        fullWidth
        name={name}
        label={formatMessage({
          id: label,
          defaultMessage: label,
        })}
        onChange={onChange}
        {...props}
      />
    </FormControl>
  );
}
