import { Request, Response, NextFunction } from 'express';
import { jwtUtils } from '../utils/jwt';

// Estende o tipo do Express para incluir o usuário autenticado
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
      };
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token de acesso não fornecido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwtUtils.verifyAccess(token);
    req.user = { userId: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}
