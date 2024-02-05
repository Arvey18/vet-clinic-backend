import { check } from 'express-validator';
import bcryptjs from 'bcryptjs';

class AuthValidator {
  constructor(Users) {
    this.Users = Users;
    this.passwordLength = this.checkPasswordLength();
    this.emailValid = this.checkEmailValidity();
    this.emailExist = this.checkEmailExistence();
    this.loginFieldsCheck = this.checkLoginFields();
  }

  // check for password length
  // and if strong
  checkPasswordLength = () => {
    return check('password')
      .isLength({ min: 6 })
      .withMessage('Password has to be more than 6 characters.')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage(
        'Password should include at least one lowercase letter, one uppercase letter, one number, and one special character.',
      );
  };

  // check if valid email
  checkEmailValidity = () => {
    return check('email').isEmail().withMessage('Please provide a valid email.');
  };

  // check if already registered user using email
  checkEmailExistence = () => {
    return check('email').custom(async (value) => {
      const user = await this.Users.findOne({ where: { email: value } });
      if (user) {
        throw new Error('Email Already Exists!');
      }
    });
  };

  // checking login fields
  checkLoginFields = () => {
    return check('email').custom(async (value, { req }) => {
      const { email, password } = req.body;

      // checkinf if fields are empty
      if (!email || !password) {
        throw new Error('All fields must be filled!');
      }

      // check if email exists
      const user = await this.Users.findOne({ where: { email: value } });
      if (!user) {
        throw new Error('Email does not exist!');
      }

      // check if correct password
      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Incorrect password!');
      }

      // pass data to the next function
      req.user = user;
    });
  };

  // funtion to run register validation
  get registerValidation() {
    return [this.emailValid, this.passwordLength, this.emailExist];
  }

  // function to run login validation
  get loginValidation() {
    return [this.loginFieldsCheck];
  }
}

export default AuthValidator;
