const { response } = require('express');
const Player = require('../models/player');

const getPlayers = async (req, res = response) => {
  const { search = '', page = 1, order = 'asc' } = req.query;

  const options = {
    page: page,
    limit: 8,
    sort: { name: order },
    populate: [
      {
        path: 'country',
        select: 'name',
      },
      {
        path: 'team',
        select: 'name',
      },
      {
        path: 'league',
        select: 'name',
      },
    ],
  };
  const query = {
    name: { $regex: search, $options: '$i' },
  };

  Player.paginate(
    {
      $and: [query],
    },
    options,
    function (err, players) {
      res.json({
        ok: true,
        players,
      });
    },
  );
};

module.exports = {
  getPlayers,
};
