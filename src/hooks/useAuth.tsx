import axios from 'axios';
import { useEffect } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import Router from 'next/router';

const url = '/api/auth';

interface HookParams {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface RegisterData extends LoginData {
  name: string;
}

export function login(data: LoginData) {
  return axios.post(`${url}/login`, data);
}

export function register(data: RegisterData) {
  return axios.post(`${url}/register`, data);
}

export const logout = async (mutate: KeyedMutator<any>) => {
  await axios.post(`${url}/logout`);
  mutate();
};

const fetcher = (url: string) => axios.get(url).then(({ data }) => data?.data);

export default function useAuth({
  redirectTo,
  redirectIfFound = false,
}: HookParams) {
  const { data: user, error, mutate } = useSWR<UserData>(`${url}/me`, fetcher);

  useEffect(() => {
    if (error && redirectTo && !redirectIfFound) Router.push(redirectTo);
    if (user && redirectIfFound) Router.push(redirectTo);
  }, [user, error, redirectTo, redirectIfFound]);

  return {
    user,
    loading: !user && !error,
    logout: () => logout(mutate),
  };
}
