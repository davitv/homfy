import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import validate from '../middleware/validation';
import {createUser} from './crud';
import User from './models';
import * as urls from './urls';
import {comparePassword, getAccessToken} from './utils';

const router = express.Router();

router.post(urls.SIGNUP, [
  body('username').isString(),
  body('password').isLength({min: 5}),
  validate
], async (req: Request, res: Response) => {
  const {
    username,
    password
  } = req.body;

  const user = await createUser({
    username,
    password
  });

  res.status(201).json({
    accountInfo: {
      id: user.id,
      username: user.username,
    }
  });
});

router.post(urls.LOGIN, [
  body('username').isString(),
  body('password').isLength({min: 5}),
  validate
], async (req: Request, res: Response) => {
  const {
    username,
    password
  } = req.body;

  const user = await User.findOne({
    where: {
      username
    }
  });

  if (user === null || !(await comparePassword(user.password, password))) {
    return res.status(400).json({
      non_field_errors: "Wrong username and/or password"
    });
  }

  res.status(200).json({
    accountInfo: {
      id: user.id,
      username: user.username,
    },
    accessToken: getAccessToken(user.id)
  });
});

export default router;
