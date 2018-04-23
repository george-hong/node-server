var mainRouter = require('express').Router();
var bodyParser = require('body-parser');

var startEndHandler = require('../common/startEndHandler.js');
var userRouter = require('./user/userRouter.js');


mainRouter.use(startEndHandler.startHandler);
mainRouter.use(bodyParser.urlencoded({ extended: false }));

mainRouter.use('/api/user', userRouter);

module.exports = mainRouter;