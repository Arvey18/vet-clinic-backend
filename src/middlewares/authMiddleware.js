const passport = require('passport');

exports.userAuth = passport.authenticate('jwt', { session: false });

const { validationResult } = require('express-validator');

exports.validationMiddleware = (req, res, next) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};
