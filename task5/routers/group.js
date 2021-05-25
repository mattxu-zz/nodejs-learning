import Joi from 'joi';
import express from 'express';
import expressJoiValidation from 'express-joi-validation';
import GroupService from '../services/group-service';
import { logMethodError } from '../utils/log';

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
    try {
        const groups = await groupService.getList();
        res.send(groups);
    } catch (error) {
        logMethodError('groupService.getList', null, error);
        res.status(400).send(error);
    }
});

groupRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const group = await groupService.getById(id);
        res.send(group);
    } catch (error) {
        logMethodError('groupService.getById', [id], error);
        res.status(400).send(error);
    }
});

groupRouter.post('/', validator.body(groupSchema), async (req, res) => {
    const newGroup = req.body;
    try {
        await groupService.create(newGroup);
        res.send();
    } catch (error) {
        logMethodError('groupService.create', [newGroup], error);
        res.status(400).send(error);
    }
});

groupRouter.put('/', validator.body(groupSchema), async (req, res) => {
    const updatedGroup = req.body;
    try {
        await groupService.update(updatedGroup);
    } catch (error) {
        logMethodError('groupService.update', [updatedGroup], error);
        res.status(400).send(error);
    }
    res.send();
});

groupRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await groupService.delete(id);
    } catch (error) {
        logMethodError('groupService.delete', [id], error);
        res.status(400).send(error);
    }
    res.send();
});

export default groupRouter;
