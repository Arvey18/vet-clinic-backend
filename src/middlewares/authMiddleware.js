import jsonwebtoken from 'jsonwebtoken';
import { SECRET } from '../constants/index.js';

class AuthMiddleware {
  constructor(Users) {
    this.Users = Users;
  }

  userAuth = async (req, res, next) => {
    // get headers
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: 'Authorization token required!' });
    }

    const token = authorization.split(' ')[1];

    try {
      const user = jsonwebtoken.verify(token, SECRET);

      const foundUser = await this.Users.findOne({ where: { user_id: user.id } });

      if (!foundUser) {
        throw new Error('401 not authorized');
      }

      const newUserData = { id: foundUser.user_id, email: foundUser.email };
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
}

export default AuthMiddleware;
