// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
};

export default errorHandlerMiddleware;
