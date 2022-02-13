const { Router } = require('express');
const { searchPlayerTeam } = require('../controllers/team');

const router = Router();

router.post('/', searchPlayerTeam);

module.exports = router;
