import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface JwtAccessPayload {
  sub: string;
  email: string;
  role: string;
}

export interface JwtRefreshPayload {
  sub: string;
}

export const jwtUtils = {
  signAccess(payload: JwtAccessPayload): string {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: env.JWT_ACCESS_EXPIRATION as jwt.SignOptions['expiresIn'],
    });
  },

  signRefresh(payload: JwtRefreshPayload): string {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRATION as jwt.SignOptions['expiresIn'],
    });
  },

  verifyAccess(token: string): JwtAccessPayload {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtAccessPayload;
  },

  verifyRefresh(token: string): JwtRefreshPayload {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtRefreshPayload;
  },
};
