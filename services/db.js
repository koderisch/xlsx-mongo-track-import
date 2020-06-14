'use strict';

const mongoose = require('mongoose');

exports.connect = (success) => {
  mongoose
    .connect('mongodb://localhost/tracksDb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(success)
    .catch((err) => {
      console.error('Mongoose connection error:', err.stack);
      process.exit(1);
    });
};

exports.close = () => {
  mongoose.connection.close();
};
