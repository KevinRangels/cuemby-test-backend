const { Router } = require('express');
const { getCountries } = require('../controllers/country');
const { validFields } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/validation-jwt');

const router = Router();
router.get('/', [validJWT, validFields], getCountries);

module.exports = router;
