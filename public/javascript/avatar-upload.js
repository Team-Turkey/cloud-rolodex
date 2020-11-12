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
    params: {
        Bucket: bucketName
    }
});




const expressUpload = async (e) => {

    var form = document.getElementById("fileUpload");
    var formData = new FormData(form);
    console.log("expressUpload", formData)
    const response = await fetch(`/api/users/avatar`, {
        method: 'POST',
        body: formData
    });
    window.location.reload()
}

(() => {
    document.getElementById('fileSelector').onchange = expressUpload;
})();