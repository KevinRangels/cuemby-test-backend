const { response } = require('express');
const axios = require('axios');
const Player = require('../models/player');
const Country = require('../models/country');
const Team = require('../models/team');
const League = require('../models/league');
const { setNames } = require('../helpers/unique-names');

const getDataFut = async (req, res = response) => {
  const { pages = 0 } = req.query;

  if (pages === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'Ingresa la cantidad de páginas a iterar como un parámetro ?page=xx',
    });
  }

  //  Reset DBS
  Player.collection.drop();
  Country.collection.drop();
  Team.collection.drop();
  League.collection.drop();

  let items = [];
  const promises = [];

  for (let index = 1; index <= pages; index++) {
    const result = axios.get(
      `https://www.easports.com/fifa/ultimate-team/api/fut/item?page=${index}`,
    );
    promises.push(result);
  }

  const results = await Promise.all(promises);
  const actualDatas = results.map((result) => result.data.items);

  for (let index = 0; index < actualDatas.length; index++) {
    actualDatas[index].forEach((element) => {
      items.push(element);
    });
  }

  //   Set names arrays
  let countries = setNames('nation', items);

  let teams = setNames('club', items);

  let leagues = setNames('league', items);

  //   Save Countries
  await Promise.all(
    countries.map(async (country) => {
      const newCountry = new Country({
        name: country,
      });

      await newCountry.save();
    }),
  );

  //   Save Teams
  await Promise.all(
    teams.map(async (team) => {
      const newTeam = new Team({
        name: team,
      });

      await newTeam.save();
    }),
  );

  //   Save Leagues
  await Promise.all(
    leagues.map(async (league) => {
      const newLeague = new League({
        name: league,
      });

      await newLeague.save();
    }),
  );

  const player = items.map((e) => ({
    name: e.name,
    position: e.positionFull,
    height: e.height,
    weight: e.weight,
    age: e.age,
    foot: e.foot,
    team: e.club.name,
    country: e.nation.name,
    league: e.league.name,
  }));

  //   Set Names Repeat Players
  let hash = {};
  let players = player.filter((o) =>
    hash[o.name] ? false : (hash[o.name] = true),
  );

  //   Save Player
  await Promise.all(
    players.map(async (data) => {
      const country = await Country.findOne({ name: data.country });
      const team = await Team.findOne({ name: data.team });
      const league = await League.findOne({ name: data.league });
      const player = new Player({
        name: data.name,
        position: data.position,
        height: data.height,
        weight: data.weight,
        age: data.age,
        foot: data.foot,
        country: country.id,
        team: team.id,
        league: league.id,
      });
      await player.save();
    }),
  );

  res.json({
    ok: true,
    players: players,
    leagues,
    teams,
    countries,
    totalPlayers: players.length,
  });
};

module.exports = {
  getDataFut,
};
