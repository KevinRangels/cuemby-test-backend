const { Router } = require('express');
const { getLeagues } = require('../controllers/league');

const router = Router();
router.get('/', getLeagues);

module.exports = router;
