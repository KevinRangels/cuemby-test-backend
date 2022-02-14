const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const seederUserAdmin = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/cuemby', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB online');
    const salt = bcryptjs.genSaltSync();

    const user = new User({
      name: 'Admin Cuemby',
      email: 'admin@mail.com',
      nit: '1234567890',
      phone: '171911',
      password: bcryptjs.hashSync('qwerty123', salt),
      img: '',
      rol: 'ADMIN_ROLE',
      state: true,
    });
    const newAdmin = await user.save();
    mongoose.connection.close();

    return console.log('save user Admin', newAdmin);
  } catch (error) {
    console.log(error);
    throw new Error('Error init DB');
  }
};

seederUserAdmin();
