import { Op } from 'sequelize';
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
}

export default UserService;
