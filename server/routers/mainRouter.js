var mainRouter = require('express').Router();
var bodyParser = require('body-parser');

var startEndHandler = require('../handlers/startEndHandler.js');
var apiRouter = require('./apiRouter.js');
var userRouter = require('./userRouter.js');


mainRouter.use(startEndHandler.startHandler);
mainRouter.use(bodyParser.urlencoded({ extended: false }));

mainRouter.use('/api', apiRouter);
mainRouter.use('/user', userRouter);

module.exports = mainRouter;