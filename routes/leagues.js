const { Router } = require('express');
const { getLeagues } = require('../controllers/league');
const { validFields } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/validation-jwt');

const router = Router();
router.get('/', [validJWT, validFields], getLeagues);

module.exports = router;
