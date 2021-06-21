import { Group } from '../data-access';

class GroupService {
    getList() {
        return Group.findAll();
    }

    getById(id) {
        return Group.findOne({
            where: {
                id
            }
        });
    }

    create(group) {
        return Group.create(group);
    }

    update(group) {
        return Group.update(group, {
            where: {
                id: group.id
            }
        });
    }

    delete(id) {
        return Group.destroy({
            where: {
                id
            }
        });
    }
}

export default GroupService;
