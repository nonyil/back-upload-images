const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const aws = require("aws-sdk");


// let aws_test = new S3Client({
//   region: process.env.AWS_DEFAULT_REGION,
// });

const aws_access_key_id = process.env.AWS_ACCESS_KEY_ID;
const aws_access_secret_key = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({region: 'us-east-1',
acl: 'public-read',});
// const upload = multer.diskStorage({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'upload-files-bucket-new',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       crypto.pseudoRandomBytes(16, function (err, raw) {
//         if (err) cb(err);

//         file.key = `${hash.toString("hex")}-${file.originalname}`;
//         console.log(file.key);

//         cb(null, file.key);
//       }
//       );
//     }
//   })
// })

const storageTypes = {

  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;
        console.log(file.key);

        cb(null, file.key);
      })
    }
  }),

  // storage: multerS3({
  //   s3: s3,
  //   acl: "public-read",
  //   bucket: "upload-files-bucket-new",
  //   key: function (req, file, cb) {
  //     cb(null, new Date().toISOString() + '-' + file.originalname);
  //   }
  // })

    storage: multerS3({
      s3: s3,
      // ACL: 'public-read',
    bucket: 'caixinha-do-aws',
    region: 'us-east-1',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        
        const filename = `${hash.toString("hex")}-${file.originalname}`;
        
        cb(null, filename);
      })
      console.log('---=-=-=-=-=-==-=-=-=-=-=-=-==--==-=-=-=', multerS3);
    }
  }),
}

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes["storage"],
  // storage: upload,
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