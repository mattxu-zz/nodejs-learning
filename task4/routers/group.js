import Joi from 'joi';
import express from 'express';
import expressJoiValidation from 'express-joi-validation';
import GroupService from '../services/group-service';

const groupService = new GroupService();
const validator = expressJoiValidation.createValidator({});

const groupRouter = express.Router();

const groupSchema = Joi
    .object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        permissions: Joi.array().items(Joi.string())
    });

groupRouter.get('/', async (req, res) => {
    const groups = await groupService.getList();
    res.send(groups);
});

groupRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const group = await groupService.getById(id);
    res.send(group);
});

groupRouter.post('/', validator.body(groupSchema), async (req, res) => {
    const newGroup = req.body;
    await groupService.create(newGroup);
    res.send();
});

groupRouter.put('/', validator.body(groupSchema), async (req, res) => {
    const updatedGroup = req.body;
    try {
        await groupService.update(updatedGroup);
    } catch (error) {
        res.status(400).send(error);
    }
    res.send();
});

groupRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await groupService.delete(id);
    } catch (error) {
        res.status(400).send(error);
    }
    res.send();
});

export default groupRouter;
