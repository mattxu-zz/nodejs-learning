import Joi from 'joi';
import express from 'express';
import expressJoiValidation from 'express-joi-validation';
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

const userList = [
    {
        id: '1',
        login: 'user1',
        password: 'abc123',
        age: 18,
        isDeleted: false
    },
    {
        id: '2',
        login: 'user2',
        password: 'cba123',
        age: 22,
        isDeleted: false
    }
];

userRouter.get('/', (req, res) => {
    res.send(userList);
});

userRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = userList.find(u => u.id === id);
    res.send(user);
});

userRouter.post('/', validator.body(userSchema), (req, res) => {
    const newUser = req.body;
    if (userList.find(u => u.id === newUser.id)) {
        res.status(400).send('User exists');
    }
    userList.push(newUser);
    res.send();
});

userRouter.put('/', validator.body(userSchema), (req, res) => {
    const updatedUser = req.body;
    const { id } = updatedUser;
    const userIndex = userList.findIndex(u => u.id === id);
    if (userIndex < 0) res.status(400).send('User not found');
    userList[userIndex] = { ...updatedUser };
    res.send();
});

userRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const user = userList.find(u => u.id === id);
    if (!user) res.status(400).send('User not found');
    user.isDeleted = true;
    res.send();
});

userRouter.get('/auto-suggest/:loginSubstring/:limit', (req, res) => {
    const { loginSubstring, limit } = req.params;
    const users = userList.filter(u => u.login.includes(loginSubstring)).slice(0, limit);
    res.send(users);
});

export default userRouter;
