const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const db = require('../db');
const { SECRET } = require('../constants');

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query('select user_id, email, created_at from users');
    return res.status(200).json({
      success: true,
      users: rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.protectedGetUsers = async (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info!',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    await db.query('insert into users(email, password)values($1,$2)', [email, hashedPassword]);
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
  };
  try {
    const token = await sign(payload, SECRET);
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

exports.logout = async (req, res) => {
  const user = req.user;
  const payload = {
    id: user.user_id,
    email: user.email,
  };
  try {
    const token = await sign(payload, SECRET);
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
