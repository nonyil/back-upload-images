const testModel = require('../mongo/models/test');

async function create() {
  const createdTest = await testModel.create({
    name: 'nonynho',
    age: '24'
  });
  return createdTest
};

module.exports = create;