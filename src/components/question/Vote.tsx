import { Typography, IconButton, Box, useTheme } from '@mui/material';
import ArrowUpward from '@mui/icons-material/ExpandLess';
import ArrowDownward from '@mui/icons-material/ExpandMore';
import type { VOTE_TYPE } from '@prisma/client';

interface Props {
  totalVotes: number;
  vote: (type: VOTE_TYPE) => void;
}

export default function Vote({ totalVotes, vote }: Props) {
  const theme = useTheme();

  return (
    <Box
      display='flex'
      flexDirection='column'
    >
      <IconButton
        onClick={() => vote('up_vote')}
        sx={{
          color: theme.palette.success.main,
        }}
      >
        <ArrowUpward />
      </IconButton>
      <Typography
        variant='body1'
        align='center'
      >
        {totalVotes || 0}
      </Typography>
      <IconButton
        onClick={() => vote('down_vote')}
        sx={{
          color: theme.palette.error.main,
        }}
      >
        <ArrowDownward />
      </IconButton>
    </Box>
  );
}
