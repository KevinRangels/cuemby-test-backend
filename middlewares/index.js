// const validJWT = require('../middlewares/validation-jwt');
const validRoles = require('./valid-rol');
const validField = require('./valid-fields');
const validUploadFile = require('./valid-file');

module.exports = {
  // ...validJWT,
  ...validRoles,
  ...validField,
  ...validUploadFile,
};
