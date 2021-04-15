import { Sequelize } from 'sequelize';
import config from '../config';
import UserCreator from '../models/user';
const sequelize = new Sequelize(config.connectionString);

const User = UserCreator(sequelize);

export {
    User
};
