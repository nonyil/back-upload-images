const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const aws = require("aws-sdk");
var multerS3 = require("multer-s3-v2");


const storageTypes = {

  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, async (err, hash) => {
        if (err) cb(err);

       file.key = await `${hash.toString("hex")}-${file.originalname}`;
        console.log(file.key);

        cb(null, file.key);
      })
    }
  }),
  s3: multerS3({
    s3: new aws.S3({
      s3: '2006-03-01',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1',
      apiVersion: '2006-03-01',
    }),
    bucket: 'caixinha-do-aws',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const filename = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, filename);
      }
    )}
  })

}

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes["s3"],
  limits: {
    fileSize: 2 * 1024 * 9024,
  }, 
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
    'image/jpeg', 
    'image/pjpeg', 
    'image/png', 
    'image/gif'
    ];
    if(allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
};