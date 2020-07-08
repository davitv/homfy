import {Request as ExpressRequest, Response} from 'express';

export type Request = ExpressRequest & {
  context?: {
    userId: number
  }
};

export {Response};
