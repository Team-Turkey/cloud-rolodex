
//  function signup(req, res) {
//     aws.config.setPromisesDependency();
//     aws.config.update({
//       accessKeyId: process.env.ACCESSKEYID,
//       secretAccessKey: process.env.SECRETACCESSKEY,
//       region: process.env.REGION
//     });
//     const s3 = new aws.S3();
//     var params = {
//       ACL: 'public-read',
//       Bucket: process.env.BUCKET_NAME,
//       Body: fs.createReadStream(req.file.path),
//       Key: `userAvatar/${req.file.originalname}`
//     };

//     s3.upload(params, (err, data) => {
//       if (err) {
//         console.log('Error occurred while trying to upload to S3 bucket', err);
//       }

//       if (data) {
//         fs.unlinkSync(req.file.path); // Empty temp folder
//         const locationUrl = data.Location;
//         let newUser = new Users({ ...req.body, avatar: locationUrl });
//         newUser
//           .save()
//           .then(user => {
//             res.json({ message: 'User created successfully', user });
//           })
//           .catch(err => {
//             console.log('Error occurred while trying to save to DB');
//           });
//       }
//     });
//   };

//   (() => {
//     document.getElementById('file-input').onchange = signup;
// })();

  //Bucket Configurations
  var bucketName = 'cloud-rolodex';
  var bucketRegion = 'us-east-2';
  var IdentityPoolId = 'us-east-2:6b47a7ae-f625-4149-91b1-bf2a68223673';

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId
    })
  });

  var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: bucketName }
  });



function s3upload() {
   var files = document.getElementById('fileUpload').files;
   if (files) 
   {
     var file = files[0];
     // Save to a random filename to prevent file tampering
     var fileName = Math.random().toString().substr(2);
     var filePath = 'my-first-bucket-path/' + fileName;
     var fileUrl = 'https://' + bucketRegion + '.amazonaws.com/my-    first-bucket/' +  filePath;
     s3.upload({
        Key: filePath,
        Body: file,
        ACL: 'public-read'
        }, function(err, data) {
        if(err) {
        reject('error');
        }
        alert('Successfully Uploaded!');
        }).on('httpUploadProgress', function (progress) {
        var uploaded = parseInt((progress.loaded * 100) / progress.total);
        $("progress").attr('value', uploaded);
      });
   }
};


   
