require('dotenv').config();

const express = require("express");
const { mongoose } = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const app = express();

mongoose.connect(process.env.URL_MONGO, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));


app.use(require("./routes"));

app.listen(3000);