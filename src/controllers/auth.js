const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const db = require('../db');
const { SECRET } = require('../constants');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    await db.query('insert into users(email, password, roles)values($1,$2,$3)', [email, hashedPassword, ['1111']]);
    return res.status(201).json({
      success: true,
      message: 'The Registration was successfull!',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const user = req.user;
  const payload = {
    id: user.user_id,
    email: user.email,
    created_at: user.created_at,
  };
  try {
    const token = await sign(payload, SECRET, { expiresIn: '8h' });
    return res
      .status(200)
      .cookie('token', token, { httpOnly: true })
      .json({ success: true, message: 'Login Successfull!' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.logout = async (_req, res) => {
  try {
    return res
      .status(200)
      .clearCookie('token', { httpOnly: true })
      .json({ success: true, message: 'Logout Successfull!' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
