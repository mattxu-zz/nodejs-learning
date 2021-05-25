import express from 'express';
import userRouter from './routers/user';
import groupRouter from './routers/group';
import userGroupRouter from './routers/userGroup';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/user-group', userGroupRouter);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
