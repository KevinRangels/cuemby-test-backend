const { response } = require('express');
const League = require('../models/league');

const getLeagues = async (req, res = response) => {
  const query = { state: true };

  const [total, leagues] = await Promise.all([
    League.countDocuments(query),
    League.find(),
  ]);

  res.json({
    ok: true,
    total,
    leagues,
  });
};

module.exports = {
  getLeagues,
};
