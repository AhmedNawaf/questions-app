const cookieAge = 30 * 24 * 60 * 60;

interface CookieOptions {
  expired?: boolean;
}

export function createCookie(token: string, { expired }: CookieOptions = {}) {
  return `accessToken=${token}; Max-Age=${
    expired ? -1 : cookieAge
  }; Path=/; HttpOnly; SameSite=Lax`;
}
