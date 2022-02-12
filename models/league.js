const { Schema, model } = require('mongoose');

const LeagueSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
});

module.exports = model('League', LeagueSchema);
