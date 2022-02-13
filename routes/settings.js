const { Router } = require('express');
const { getDataFut, getDataDashboard } = require('../controllers/settings');
const { validFields } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/validation-jwt');

const router = Router();

router.get('/get-data-fut21', [validJWT, validFields], getDataFut);
router.get('/get-data-dashboard', [validJWT, validFields], getDataDashboard);

module.exports = router;
