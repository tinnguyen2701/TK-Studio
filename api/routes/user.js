const userRouter = require('express').Router();
const cloudinary = require('cloudinary');
const passport = require('passport');
const upload = require('../config/multer');
const logger = require('../utils/logger');
require('../config/cloudinary');

userRouter.post(
  '/addStudent',
  passport.authenticate('jwt', { session: false }),
  upload.fields([{ name: 'avatar', maxCount: 1 }]),
  async (req, res) => {
    const { name } = req.body;

    const avatar = await cloudinary.v2.uploader
      .upload(req.files['avatar'][0].path)
      .then(result => {
        return result.secure_url;
      })
      .catch(err => {
        logger.logError('faild to upload poster', err);
        res.sendStatus(500);
      });

    console.log(name);
    console.log(avatar);
  },
);

module.exports = userRouter;
