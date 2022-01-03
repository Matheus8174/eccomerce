import { body } from 'express-validator';

class UserValidator {
  public signup() {
    return [
      body('name', 'name is required').notEmpty(),
      body('email', 'invalid email').isEmail().isLength({ min: 4 }),
      body('password', 'password invalid').isLength({ min: 6 })
    ]
  }
};

export default UserValidator;