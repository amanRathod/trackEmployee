<<<<<<< HEAD
/* eslint-disable no-console */
=======
>>>>>>> 53a7a5843d75005efec012ab0bb064a548de358a
const mongoose = require('mongoose');

const connectDB = async() => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`MongoDb connected ${connect.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;


module.exports = connectDB;
