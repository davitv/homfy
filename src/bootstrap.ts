import dotenv from 'dotenv';
import {Model} from 'sequelize';
import User from './auth/models';
import checkConfigs from './checkConfigs';

dotenv.config();

const models = [
  User,
];

export function syncDatabase() {
  const promises: Promise<Model>[] = [];

  models.forEach(model => {
    promises.push(model.sync({alter: true}));
  });

  return Promise.all(promises);
}

export default () => {
  checkConfigs();
  return syncDatabase();
}
