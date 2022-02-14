const mongoose = require('mongoose');
const Rol = require('../models/role');

const seederRols = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/cuemby', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB online');

    const roles = [
      {
        rol: 'ADMIN_ROLE',
      },
      {
        rol: 'USER_ROLE',
      },
    ];

    await Promise.all(
      roles.map(async (e) => {
        const rols = new Rol(e);
        await rols.save();
      }),
    );
    mongoose.connection.close();

    return console.log('Rols Created', roles);
  } catch (error) {
    console.log(error);
    throw new Error('Error init DB');
  }
};

seederRols();
