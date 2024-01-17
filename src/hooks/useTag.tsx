import useSWR from 'swr';
import axios from 'axios';
import type { tags } from '@prisma/client';

const url = '/api/tag';

const fetcher = (url: string) => axios.get(url).then(({ data }) => data?.data);

export function useTags() {
  const { data } = useSWR<tags[]>(url, fetcher);
  return {
    data: data || [],
  };
}
