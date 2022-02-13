const { Router } = require('express');
const { getDataFut } = require('../controllers/settings');
const { validFields } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/validation-jwt');

const router = Router();

router.get('/get-data-fut21', [validJWT, validFields], getDataFut);

module.exports = router;
