const settingRouter = require('express').Router();
const cloudinary = require('cloudinary');
const passport = require('passport');
const upload = require('../config/multer');
const logger = require('../utils/logger');
const Setting = require('../models/setting');
const Video = require('../models/videos');

require('../config/cloudinary');

settingRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const setting = await Setting.find({});
  const videos = await Video.find({});
  return res.status(200).send({ setting: setting[0], videos });
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

settingRouter.post(
  '/addVideo',
  passport.authenticate('jwt', { session: false }),
  upload.fields([{ name: 'poster', maxCount: 1 }]),
  async (req, res) => {
    const poster = await cloudinary.v2.uploader
      .upload(req.files['poster'][0].path)
      .then(result => {
        return result.secure_url;
      })
      .catch(err => {
        logger.logError('faild to upload poster', err);
        res.sendStatus(500);
      });

    const newVideo = new Video({
      poster,
      link: req.body.link,
      description: req.body.description,
    });

    await newVideo.save();
    return res.status(200).send({ newVideo });
  },
);

settingRouter.post(
  '/editVideo',
  passport.authenticate('jwt', { session: false }),
  upload.fields([{ name: 'poster', maxCount: 1 }]),
  async (req, res) => {
    const { link, description, id } = req.body;
    let poster = await Video.findById(id).then(video => video.poster);

    if (req.files['poster'] !== undefined) {
      poster = await cloudinary.v2.uploader
        .upload(req.files['poster'][0].path)
        .then(result => {
          return result.secure_url;
        })
        .catch(err => {
          logger.logError('failed to upload poster', err);
          res.sendStatus(500);
        });
    }

    await Video.updateOne({ _id: id }, { $set: { link, description, poster } }, { upsert: true })
      .then(() => {
        logger.logInfo('edit video thanh cong');
        return res.status(200).send({ id, link, description, poster });
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  },
);

settingRouter.post(
  '/removeVideo',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await Video.remove({ _id: req.body.id })
      .then(() => {
        return res.status(200).send({ id: req.body.id });
      })
      .catch(() => {
        return res.status(500).send('something went wrong!');
      });
  },
);

settingRouter.get('/videos', async (req, res) => {
  await Video.find({})
    .then(videos => {
      return res.status(200).send(videos);
    })
    .catch(() => {
      return res.status(500).send('something went wrong!');
    });
});

module.exports = settingRouter;
