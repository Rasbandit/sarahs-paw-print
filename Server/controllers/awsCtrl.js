var app = require('./../index');
var db = app.get('db');
var multer = require('multer');
var upload = multer();
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});
const s3 = new AWS.S3();

module.exports = {
  upload: function(req, res, next) {
    console.log(req.file.originalname);
    console.log(req.file);
    console.log(req.body);
    const buf = new Buffer(req.file.buffer, 'base64');

    const bucketName = 'sarahgreggportfolio/portraits';
    const params = {
      Bucket: bucketName,
      Key: `${req.body.titel}.jpg`,
      Body: buf,
      ACL: 'public-read'
    }
    s3.upload(params, function(err, data) {
      if (err) {
         console.log(err);
         return res.status(500).send(err);
      }
      else {
        res.status(200).send();
      }
      // db.upload_picture([data.Location, req.body.title], function(err){
      //    console.log(err);
      // })
    });
  }
}
