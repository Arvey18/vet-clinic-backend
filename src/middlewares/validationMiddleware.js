import { validationResult } from 'express-validator';

// send errors if exist
const validationMiddleware = (req, res, next) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

export default validationMiddleware;
