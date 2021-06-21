import Joi from 'joi';
import express from 'express';
import expressJoiValidation from 'express-joi-validation';
import UserService from '../services/user-service';
import { logMethodError } from '../utils/log';

const userService = new UserService();
const validator = expressJoiValidation.createValidator({});

const userRouter = express.Router();

const userSchema = Joi
    .object({
        id: Joi.string().required(),
        login: Joi.string().required(),
        password: Joi.string().required()
            .pattern(/[a-zA-Z]+/)
            .pattern(/[0-9]+/)
            .messages({
                'string.pattern.base': '"password" must contains letters and numbers'
            }),
        age: Joi.number().required().integer().min(4).max(130),
        isDeleted: Joi.boolean().required()
    });

userRouter.get('/', async (req, res) => {
    try {
        const users = await userService.getList();
        res.send(users);
    } catch (error) {
        logMethodError('userService.getList', null, error);
        res.status(400).send(error);
    }
});

userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getById(id);
        res.send(user);
    } catch (error) {
        logMethodError('userService.getById', [id], error);
        res.status(400).send(error);
    }
});

userRouter.post('/', validator.body(userSchema), async (req, res) => {
    const newUser = req.body;
    try {
        await userService.create(newUser);
        res.send();
    } catch (error) {
        logMethodError('userService.create', [newUser], error);
        res.status(400).send(error);
    }
});

userRouter.put('/', validator.body(userSchema), async (req, res) => {
    const updatedUser = req.body;
    try {
        await userService.update(updatedUser);
    } catch (error) {
        logMethodError('userService.update', [updatedUser], error);
        res.status(400).send(error);
    }
    res.send();
});

userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await userService.delete(id);
    } catch (error) {
        logMethodError('userService.delete', [id], error);
        res.status(400).send(error);
    }
    res.send();
});

userRouter.get('/auto-suggest/:loginSubstring/:limit', async (req, res) => {
    const { loginSubstring, limit } = req.params;
    try {
        const users = await userService.autoSuggest(loginSubstring, limit);
        res.send(users);
    } catch (error) {
        logMethodError('userService.autoSuggest', [loginSubstring, limit], error);
        res.status(400).send(error);
    }
});

userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await userService.login(username, password);
        if (!token) {
            res.status(400).send('User name or password not correct');
        } else {
            res.send(token);
        }
    } catch (error) {
        logMethodError('userService.login', [username, password], error);
        res.status(400).send(error);
    }
});

export default userRouter;
