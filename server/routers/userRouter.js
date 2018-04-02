var router = require('express').Router();

var userRouter = router.get('/a', function (req, res, next) {
  res.send('userRouter a');
});

module.exports = userRouter;