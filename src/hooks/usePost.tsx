import useSWR from 'swr';
import axios from 'axios';
import type { VOTE_TYPE } from '@prisma/client';
import { PostsData } from '@/pages/api/post';
import { PostData } from '@/pages/api/post/[id]';
interface PostsInputs {
  page: number;
  sort?: 'asc' | 'desc';
  tag?: number;
}

const baseUrl = '/api/post';

const fetcher = (url: string) => axios.get(url).then(({ data }) => data?.data);

export function usePosts({ page = 1, sort = 'asc', tag }: PostsInputs) {
  const url = `${baseUrl}?page=${page}&sort=${sort}&tag=${tag}`;
  const { data, error, isLoading } = useSWR<PostsData>(url, fetcher);
  return {
    data,
    error,
    isLoading,
  };
}

export default function usePost(id: number) {
  const url = `${baseUrl}/${id}`;
  const { data, error, mutate } = useSWR<PostData>(url, fetcher);
  const answer = async (params: { content: string }) => {
    if (!data) throw new Error('missing data at answer function');
    await axios.post('/api/post/answer', { ...params, question: id });
    await mutate({ ...data });
  };
  const vote = async (id: number | undefined, type: VOTE_TYPE) => {
    if (!data) throw new Error('missing data at vote function');
    await axios.post('/api/post/vote', { post: id, type });
    await mutate({ ...data });
  };
  return {
    data,
    error,
    loading: !data && !error,
    answer,
    vote,
  };
}

interface AskPayload {
  title: string;
  content: string;
  tags: number[];
}

export const ask = async (params: AskPayload) => {
  const { data } = await axios.post('/api/post/question', params);
  return data?.data?.id;
};
