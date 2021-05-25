import { UserGroup, sequelize } from '../data-access';

class UserGroupService {
    addUsersToGroup(groupId, userIds) {
        if (!Array.isArray(userIds)) return Promise.reject();
        return sequelize.transaction((t) => {
            const promiseArray = userIds.map((userId) => {
                return UserGroup.create({
                    UserId: userId,
                    GroupId: groupId
                }, { transaction: t });
            });
            return Promise.all(promiseArray);
        });
    }
}

export default UserGroupService;
