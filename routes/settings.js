const { Router } = require('express');
const { getDataFut } = require('../controllers/settings');

const router = Router();

router.get('/get-data-fut21', getDataFut);

module.exports = router;
