import { Box } from '@mui/material';

interface Props {
  html: string;
}

export default function Content({ html }: Props) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: html }}
      sx={{ flexGrow: 1 }}
    />
  );
}
