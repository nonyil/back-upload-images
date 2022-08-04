const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: 'string',
  age: 'string'
}, {
  versionKey: false 
})

const testModel = mongoose.model('test', testSchema);

module.exports = testModel;