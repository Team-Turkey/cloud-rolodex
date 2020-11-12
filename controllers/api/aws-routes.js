const router = require('express').Router();
const { signup } = userController;
const sequelize = require('../../config/connection');
const aws = require('aws-sdk');
const fs = require('fs');
const {
  User,
  Department,
  Role
} = require('../../models');
const withAuth = require('../../utils/auth');


  router.post('/signup', (req, res) => {
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
      region: process.env.REGION
    });
    const s3 = new aws.S3();
    var params = {
      ACL: 'public-read',
      Bucket: process.env.BUCKET_NAME,
      Body: fs.createReadStream(req.file.path),
      Key: `userAvatar/${req.file.originalname}`
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log('Error occurred while trying to upload to S3 bucket', err);
      }

      if (data) {
        fs.unlinkSync(req.file.path); // Empty temp folder
        const locationUrl = data.Location;
        User.update({
            avatar: locationUrl
        },
        {
            where: {
                id: req.session.user_id
            }
        })
        // let newUser = new Users({ ...req.body, avatar: locationUrl });
        // newUser
        //   .save()
          .then(user => {
            res.json({ message: 'RESPONSE.JSON', user });
          })
          .catch(err => {
            console.log('Error occurred while trying to save to DB');
          });
      }
    });
  });


module.exports = router;