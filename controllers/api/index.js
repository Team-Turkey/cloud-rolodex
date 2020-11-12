// This file, like index.js in the models folder, will serve as a means to collect all of the API routes and package them up for us.

const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const departmentRoutes = require('./department-routes');
const roleRoutes = require('./role-routes');
// const awsRoutes = require('./aws-routes');

// router.use('/aws', awsRoutes);
router.use('/departments', departmentRoutes);
router.use('/roles', roleRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
