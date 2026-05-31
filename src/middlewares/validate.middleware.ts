import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

type ValidateTarget = 'body' | 'query' | 'params';

/**
 * Middleware de validação Zod.
 * Valida o campo alvo (body, query ou params) contra o schema fornecido.
 * Em caso de erro, retorna 400 com os detalhes dos campos inválidos.
 */
export function validate(schema: ZodSchema, target: ValidateTarget = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const errors = (result.error as ZodError).flatten().fieldErrors;
      res.status(400).json({ message: 'Dados inválidos', errors });
      return;
    }

    // Sobrescreve o target com os dados validados/transformados pelo Zod
    req[target] = result.data;
    next();
  };
}
