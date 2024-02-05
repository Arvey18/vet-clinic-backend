import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { SECRET, TOKEN_EXPIRATION } from '../constants/index.js';

class AuthController {
  constructor(Users) {
    this.Users = Users;
  }

  // function to register user
  // requires accepted email and password before proceeding
  register = async (req, res) => {
    const { email, password } = req.body;
    try {
      const hashedPassword = await bcryptjs.hash(password, 10);
      await this.Users.create({ email, password: hashedPassword, roles: ['1111'] });
      return res.status(201).json({
        success: true,
        message: 'The Registration was successful!',
      });
    } catch (error) {
      console.log(error.message, 'error pre');
      return res.status(500).json({
        error: error.message,
        name: error.name,
      });
    }
  };

  // function to login user
  // requires validator already checking the existence
  // of id of the user
  login = async (req, res) => {
    const user = req.user;
    const payload = {
      id: user.user_id,
      email: user.email,
      created_at: user.created_at,
    };
    try {
      const token = await jsonwebtoken.sign(payload, SECRET, { expiresIn: TOKEN_EXPIRATION });
      return res
        .status(200)
        .cookie('token', token, { httpOnly: true })
        .json({ success: true, message: 'Login Successful!', user: { email: user.email, token } });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        error: error.message,
        name: error.name,
      });
    }
  };

  // function to login user
  // remove cookie token in server
  logout = async (_req, res) => {
    try {
      return res
        .status(200)
        .clearCookie('token', { httpOnly: true })
        .json({ success: true, message: 'Logout Successful!' });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        error: error.message,
        name: error.name,
      });
    }
  };
}

export default AuthController;
