import React from 'react';
import Link from 'next/link';
import { Box, Chip } from '@mui/material';
import type { tags } from '@prisma/client';

interface Props {
  items: tags[];
}

export default function Tags({ items }: Props) {
  return (
    <Box sx={{ '& > *': { margin: 0.5 } }}>
      {items.map((e) => (
        <Link
          href={`/tag/${e.slug}`}
          passHref
          key={e.id}
        >
          <Chip
            label={e.name}
            color='primary'
            variant='outlined'
          />
        </Link>
      ))}
    </Box>
  );
}
