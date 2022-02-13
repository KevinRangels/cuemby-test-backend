const { Router } = require('express');
const { getPlayers } = require('../controllers/player');
const { validFields } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/validation-jwt');

const router = Router();

router.get('/', [validJWT, validFields], getPlayers);

module.exports = router;
