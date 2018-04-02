var mainRouter = require('express').Router();

var startEndHandler = require('../handlers/startEndHandler.js');
var apiRouter = require('./apiRouter.js');
var userRouter = require('./userRouter.js');

mainRouter.use(startEndHandler.startHandler);
mainRouter.use('/api', apiRouter);
mainRouter.use('/user', userRouter);

module.exports = mainRouter;