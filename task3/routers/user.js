import Joi from 'joi';
import express from 'express';
import expressJoiValidation from 'express-joi-validation';
import UserService from '../services/user-service';

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
    const users = await userService.getList();
    res.send(users);
});

userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await userService.getById(id);
    res.send(user);
});

userRouter.post('/', validator.body(userSchema), async (req, res) => {
    const newUser = req.body;
    await userService.create(newUser);
    res.send();
});

userRouter.put('/', validator.body(userSchema), async (req, res) => {
    const updatedUser = req.body;
    try {
        await userService.update(updatedUser);
    } catch (error) {
        res.status(400).send(error);
    }
    res.send();
});

userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await userService.delete(id);
    } catch (error) {
        res.status(400).send(error);
    }
    res.send();
});

userRouter.get('/auto-suggest/:loginSubstring/:limit', async (req, res) => {
    const { loginSubstring, limit } = req.params;
    const users = await userService.autoSuggest(loginSubstring, limit);
    res.send(users);
});

export default userRouter;
