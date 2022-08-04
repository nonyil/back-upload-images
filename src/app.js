const express = require('express');
const testCreate = require('./controllers/test');
const { connection } = require('./api/connection'); 

const app = express();

app.use(express.json());
connection();
app.post('/', testCreate);

app.listen(3000, () => (console.log('doido')));