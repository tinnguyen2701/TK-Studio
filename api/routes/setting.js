const settingRouter = require('express').Router();
const cloudinary = require('cloudinary');
const passport = require('passport');
const upload = require('../config/multer');
const logger = require('../utils/logger');
const Setting = require('../models/setting');
require('../config/cloudinary');

settingRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const setting = await Setting.find({});
  return res.status(200).send(setting[0]);
});

settingRouter.post(
  '/changeImageStudent',
  passport.authenticate('jwt', { session: false }),
  upload.fields([{ name: 'imageStudent', maxCount: 1 }]),
  async (req, res) => {
    const imageStudent = await cloudinary.v2.uploader
      .upload(req.files['imageStudent'][0].path)
      .then(result => {
        return result.secure_url;
      })
      .catch(err => {
        logger.logError('faild to upload poster', err);
        res.sendStatus(500);
      });

    await Setting.updateOne({}, { $set: { imageStudent } }, { upsert: true });
    return res.status(200).send({ imageStudent });
  },
);

settingRouter.post(
  '/changeImageTeacher',
  passport.authenticate('jwt', { session: false }),
  upload.fields([{ name: 'imageTeacher', maxCount: 1 }]),
  async (req, res) => {
    const imageTeacher = await cloudinary.v2.uploader
      .upload(req.files['imageTeacher'][0].path)
      .then(result => {
        return result.secure_url;
      })
      .catch(err => {
        logger.logError('faild to upload poster', err);
        res.sendStatus(500);
      });

    await Setting.updateOne({}, { $set: { imageTeacher } }, { upsert: true });
    return res.status(200).send({ imageTeacher });
  },
);

module.exports = settingRouter;
