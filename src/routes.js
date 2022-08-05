const multer = require("multer");
const routes = require("express").Router();
const multerConfig = require("./config/multer");


routes.post('/posts', multer(multerConfig).single('file'), (req, res) => {
  console.log(req.file);
  return res.json({ hello: 'World' });
})


module.exports = routes;