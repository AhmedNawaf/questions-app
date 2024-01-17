import axios from 'axios';

const url = '/api/user';

interface UpdateUser {
  name: string;
  email: string;
  password: string;
  newPassword: string;
}

export const updateProfile = async (
  data: Pick<UpdateUser, 'email' | 'name'>
) => {
  await axios.post(`${url}/profile`, data);
};

export const updatePassword = async (
  data: Pick<UpdateUser, 'password' | 'newPassword'>
) => {
  await axios.post(`${url}/password`, data);
};
