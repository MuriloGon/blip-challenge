import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RepoParamsSchema } from '../schemas/Repos';

export function ValidateQueryParams(req: Request, res: Response, next: NextFunction) {
  const { error } = RepoParamsSchema(req.query);
  if (error !== undefined) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
  next();
}
