import express from 'express';
import userRouter from './routers/user';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
