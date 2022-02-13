const { Router } = require('express');
const { searchPlayerTeam } = require('../controllers/team');
const { validFields } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/validation-jwt');

const router = Router();

router.post('/', [validJWT, validFields], searchPlayerTeam);

module.exports = router;
