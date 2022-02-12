const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB online');
  } catch (error) {
    console.log(error);
    throw new Error('Error init DB');
  }
};

module.exports = {
  dbConnection,
};
