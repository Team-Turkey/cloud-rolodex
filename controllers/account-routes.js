const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User,
    Department,
    Role
} = require('../models');
const withAuth = require('../utils/auth');

/*
 * Respond to GET requests to /edit-user.
 * Upon request, render the 'edit-user.handlebars' web page in views/ directory.
 */
router.get('/', withAuth, (req, res) => res.render('edit-user', {loggedIn: true}));

/*
 * Respond to GET requests to /sign-s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and
 * the anticipated URL of the image.
 */
router.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });

  router.put('/', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
          id: req.params.id
        }
      })
      // We want to make sure the session is created before we send the response back, so we're wrapping the variables in a callback. The req.session.save() method will initiate the creation of the session and then run the callback function once complete.
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
  
          res.json(dbUserData);
        })
        const post = dbUserData.get({
            plain: true
        });

        // pass data to template
        res.render('dashboard', {
          account,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
     
  });

  
  // You may wish to assign another, customized name to the object instead of using the one that the file is already named with, which is useful for preventing accidental overwrites in the S3 bucket. This name could be related to the ID of the user’s account, for example. If not, you should provide some method for properly quoting the name in case there are spaces or other awkward characters present. In addition, this is the stage at which you could provide checks on the uploaded file in order to restrict access to certain file types. For example, a simple check could be implemented to allow only .png files to proceed beyond this point.

  // Create the view responsible for receiving the account information after the user has uploaded an avatar, filled in the form, and clicked submit. This function is currently just a stub that you’ll need to complete in order to allow the app to read and store the submitted profile information and to correctly associate it with the rest of the user’s account details.
  /*
   * Respond to POST requests to /submit_form.
   * This function needs to be completed to handle the information in
   * a way that suits your application.
   */
  router.post('/save-details', (req, res) => {
    // TODO: Read POSTed form data and do something useful
  });

  router.get('/edit/:id', withAuth, (req, res) => {
    User.findOne(req.body, {
      
        where: {
          id: req.session.id
        }
      })
      // We want to make sure the session is created before we send the response back, so we're wrapping the variables in a callback. The req.session.save() method will initiate the creation of the session and then run the callback function once complete.
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({
              message: 'No user found with this id'
          });
          return;
      }
         // res.json(dbUserData);
        // })
        const user = dbUserData.get({
            plain: true
        });

        // pass data to template
        res.render('dashboard', {
            user,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
     
  });
  module.exports = router;
