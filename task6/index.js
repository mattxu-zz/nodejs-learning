import express from 'express';
import morgan from 'morgan';
import userRouter from './routers/user';
import groupRouter from './routers/group';
import userGroupRouter from './routers/userGroup';
import errorHandlerMiddleware from './middlewares/error-handler';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));
morgan.token('params', (req) => JSON.stringify(req.params));
app.use(morgan(':method :url :status :params :body'));
app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/user-group', userGroupRouter);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

process.on('uncaughtException', (err) => {
    console.error(err);
});

process.on('unhandledRejection', (error, promise) => {
    console.log('Unhandled Rejection at:', promise);
});
