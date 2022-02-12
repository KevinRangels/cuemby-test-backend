const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PlayerSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  position: {
    type: String,
    required: [true, 'position is required'],
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  age: {
    type: String,
  },
  foot: {
    type: String,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  league: {
    type: Schema.Types.ObjectId,
    ref: 'League',
    required: true,
  },
});

PlayerSchema.plugin(mongoosePaginate);

module.exports = model('Player', PlayerSchema);
