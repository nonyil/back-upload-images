const multer = require("multer");
const Post = require("./models/Post");
const routes = require("express").Router();
const multerConfig = require("./config/multer");


routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
  const { originalname: name, size, key, location: url = '' } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url
  })
  return res.json(post);
})


module.exports = routes;