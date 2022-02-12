const { Router } = require('express');
const { check } = require('express-validator');

const {
  validFields,
} = require('../middlewares');

const { isRoleValid, emailExist } = require('../helpers/db-validators');

const { usersGet, userPost } = require('../controllers/user');

const router = Router();

router.get('/', usersGet);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required, more than 6 letters').isLength({
      min: 6,
    }),
    check('email', 'Email is invalid').isEmail(),
    check('rol').custom(isRoleValid),
    check('email').custom(emailExist),
    validFields,
  ],
  userPost,
);

module.exports = router;
