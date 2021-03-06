const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'Credenciales inválidas',
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Contraseña inválida',
      });
    }

    const token = await generateJWT(user.id);

    return res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
      msg: 'Talk to the admin',
    });
  }
};

module.exports = {
  login,
};
