import {Sequelize} from 'sequelize';
const dbStorage: string = process.env.NODE_ENV === 'test' ?
  ":memory:"
  :
  './database.sqlite';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbStorage,
  logging: false,
});

export default sequelize;
