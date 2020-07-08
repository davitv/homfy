import {NextFunction} from 'express';
import {Request, Response} from '../types';
import {decodeJWT} from './utils';

export const getAuthCredentials = (req: Request): {userId: number} | undefined => {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const context = decodeJWT(authHeader);
    return context;
  }
  return undefined;
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  req.context = getAuthCredentials(req);
  next();
}

export const authRequired = (req: Request, res: Response, next: NextFunction) => {
  const credentials = getAuthCredentials(req);

  if (credentials) {
    req.context = credentials;
    next();
  } else {
    return res.status(401).json({
      non_field_errors: 'Authentication credentials were not provided',
    });
  }
}
