import Joi from 'joi';
import express from 'express';
import expressJoiValidation from 'express-joi-validation';
import UserGroupService from '../services/user-group-service';

const userGroupService = new UserGroupService();
const validator = expressJoiValidation.createValidator({});

const addUsersToGroupSchema = Joi
    .object({
        groupId: Joi.string().required(),
        userIds: Joi.array().items(Joi.string())
    });

const userGroupRouter = express.Router();

userGroupRouter.post('/', validator.body(addUsersToGroupSchema), async (req, res) => {
    const body = req.body;
    try {
        await userGroupService.addUsersToGroup(body.groupId, body.userIds);
    } catch (error) {
        res.status(400).send(error);
    }
    res.send();
});

export default userGroupRouter;
