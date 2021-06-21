import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import config from '../config';
import { User } from '../data-access';

class UserService {
    getList() {
        return User.findAll({
            where: {
                isDeleted: false
            }
        });
    }

    getById(id) {
        return User.findOne({
            where: {
                id,
                isDeleted: false
            }
        });
    }

    create(user) {
        return User.create(user);
    }

    update(user) {
        return User.update(user, {
            where: {
                id: user.id
            }
        });
    }

    delete(id) {
        return User.update({
            isDeleted: true
        }, {
            where: {
                id
            }
        });
    }

    autoSuggest(loginSubstring, limit) {
        return User.findAll({
            where: {
                login: {
                    [Op.like]: `%${loginSubstring}%`
                }
            },
            limit
        });
    }

    async login(username, password) {
        const existedUser = await User.findOne({
            where: {
                login: username,
                isDeleted: false
            }
        });
        if (existedUser?.password === password) {
            const token = jwt.sign({ ...existedUser, password: undefined }, config.jwtSecret, { expiresIn: config.jwtTokenExpire });
            return token;
        }
        return false;
    }
}

export default UserService;
