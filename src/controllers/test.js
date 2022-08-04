const create = require('../models/test');

async function testCreate(request, response) {
  const createdTest = await create()
  return response.status(201).json(createdTest);
}

module.exports = testCreate;