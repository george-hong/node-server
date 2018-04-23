var handler = {
  'startHandler': startHandler,
  'endHandler': endHandler
};

function startHandler(req, res, next) {
  console.log(req.url);
  next();
};

function endHandler(req, res, next)  {

};

module.exports = handler;