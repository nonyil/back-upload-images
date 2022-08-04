const mongoose = require('mongoose');

const urlConnection = 'mongodb+srv://mongodb:1234@mongodbtest.gtats.mongodb.net/test';

const connection = (mongodbUrl =  urlConnection) => mongoose.connect(mongodbUrl);

module.exports = { connection };
