const { Schema, model } = require('mongoose');

const CountrySchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
});

module.exports = model('Country', CountrySchema);
