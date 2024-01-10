import { sign } from 'jsonwebtoken';
import { prisma } from '../utils/db';
import type { users } from '@prisma/client';
import { compare, hash } from 'bcrypt';

type UpdateUser = Partial<Omit<users, 'id'>>;

export function signJwt(id: number) {
  const data = { id };
  return sign(data, 'some-secret');
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
) {
  return await compare(plainPassword, hashedPassword);
}

export async function updateUser(
  user_id: number,
  { email, name, password }: UpdateUser
) {
  await prisma.users.update({
    where: { id: user_id },
    data: {
      name,
      email,
      password: password ? await hash(password, 10) : password,
    },
  });
}
