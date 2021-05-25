import { Sequelize } from 'sequelize';
import config from '../config';
import GroupCreator from '../models/group';
import UserCreator from '../models/user';
import UserGroupCreator from '../models/userGroup';
const sequelize = new Sequelize(config.connectionString);

const User = UserCreator(sequelize);
const Group = GroupCreator(sequelize);
const UserGroup = UserGroupCreator(sequelize);

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

export {
    User,
    Group,
    UserGroup,
    sequelize
};
