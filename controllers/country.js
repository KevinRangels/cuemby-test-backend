const { response } = require('express');
const Country = require('../models/country');

const getCountries = async (req, res = response) => {
  const query = { state: true };

  const [total, countries] = await Promise.all([
    Country.countDocuments(query),
    Country.find(),
  ]);

  res.json({
    ok: true,
    total,
    countries,
  });
};

module.exports = {
  getCountries,
};
