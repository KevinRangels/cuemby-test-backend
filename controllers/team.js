const { response } = require('express');
const Player = require('../models/player');
const Team = require('../models/team');

const searchPlayerTeam = async (req, res = response) => {
  const { name, page = 1 } = req.body;

  try {
    const team = await Team.findOne({ name: { $regex: name, $options: '$i' } });

    if (!team) {
      return res.status(400).json({
        ok: false,
        msg: 'No se encontro un equipo con ese nombre',
      });
    }

    const options = {
      page: page,
      limit: 8,
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
      team: team.id,
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
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
      msg: 'Talk to the admin',
    });
  }
};

module.exports = {
  searchPlayerTeam,
};
