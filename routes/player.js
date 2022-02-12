const { Router } = require('express');
const { getPlayers } = require('../controllers/player');

const router = Router();

router.get('/', getPlayers);

module.exports = router;
