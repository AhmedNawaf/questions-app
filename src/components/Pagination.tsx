import { Box, Pagination } from '@mui/material';
import { useRouter } from 'next/router';

interface Props {
  totalPages?: number;
  currentPage: number;
}

export default function Pages({ totalPages, currentPage = 1 }: Props) {
  const router = useRouter();
  const onChange = (e: React.ChangeEvent<unknown>, page: number) => {
    router.push({
      pathname: '/',
      query: { ...router.query, page },
    });
  };
  return (
    <Box
      display='flex'
      justifyContent='center'
      p={3}
    >
      <Pagination
        count={totalPages}
        variant='outlined'
        color='primary'
        page={currentPage}
        onChange={onChange}
        shape='rounded'
      />
    </Box>
  );
}
