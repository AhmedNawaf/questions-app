import { Autocomplete, TextField, FormControl, useTheme } from '@mui/material';
import { FormattedMessage } from 'react-intl';

export interface Option {
  label: string;
  value: number;
}

interface Props {
  label: string;
  value: Option[];
  onChange: React.Dispatch<React.SetStateAction<Option[]>>;
  options: Option[];
}

export default function TagsInput({ label, onChange, options, value }: Props) {
  const theme = useTheme();
  return (
    <FormControl
      fullWidth
      sx={{
        marginBottom: theme.spacing(),
      }}
    >
      <Autocomplete
        value={value}
        multiple
        options={options}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        onChange={(event, selected) => {
          onChange(selected);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label={
              <FormattedMessage
                id={label}
                defaultMessage={label}
              />
            }
          />
        )}
      />
    </FormControl>
  );
}
