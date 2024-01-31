const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { SECRET } = require('../constants');
const db = require('../db');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies['token'];
  return token;
};

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      // check if user exist
      const { rows } = await db.query('SELECT user_id, email from users WHERE user_id = $1', [id]);
      if (!rows.length) {
        throw new Error('401 not Authorized');
      }

      // return user data
      const user = { id: rows[0].id, email: rows[0].email };
      return await done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  }),
);
