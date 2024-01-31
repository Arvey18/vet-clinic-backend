const { check } = require('express-validator');
const { compare } = require('bcryptjs');
const db = require('../db');

// check if password length is enough
const passwordLength = check('password')
  .isLength({ min: 6, max: 15 })
  .withMessage('Password has to be between 6 and 15 characters.');

// check if email is not empty and valid
const emailValid = check('email').isEmail().withMessage('Please provide a valid email.');

// check if email already exists
const emailExist = check('email').custom(async (value) => {
  const { rows } = await db.query('SELECT * from users WHERE email = $1', [value]);

  if (rows.length) {
    throw new Error('Email Already Exist!');
  }
});

const loginFieldsCheck = check('email').custom(async (value, { req }) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('All fields must be filled!');
  }

  // check if email exists
  const user = await db.query('SELECT * from users WHERE email = $1', [value]);
  if (!user.rows.length) {
    throw new Error('Email does not exist!');
  }

  // check if correct password
  const validPassword = await compare(password, user.rows[0].password);
  if (!validPassword) {
    throw new Error('Incorrect password!');
  }

  // pass data on next function
  req.user = user.rows[0];
});

module.exports = {
  registerValidation: [emailValid, passwordLength, emailExist],
  loginValidation: [loginFieldsCheck],
};
