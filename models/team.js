const { Schema, model } = require('mongoose');

const TeamSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
});

module.exports = model('Team', TeamSchema);
