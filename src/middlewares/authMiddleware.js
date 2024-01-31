const { verify } = require('jsonwebtoken');
const { SECRET } = require('../constants');
const db = require('../db');

exports.userAuth = async (req, res, next) => {
  // get headers
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required!' });
  }
  const token = authorization.split(' ')[1];
  try {
    const user = verify(token, SECRET);
    const { rows } = await db.query('SELECT user_id, email from users WHERE user_id = $1', [user.id]);
    if (!rows.length) {
      throw new Error('401 not authorized');
    }

    const newUserData = { id: rows[0].id, email: rows[0].email };
    req.user = newUserData;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      error: error.message,
      name: error.name,
    });
  }
};
