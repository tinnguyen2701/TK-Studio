const userRouter = require('express').Router();
const cloudinary = require('cloudinary');
const passport = require('passport');
const upload = require('../config/multer');
const logger = require('../utils/logger');
const User = require('../models/users');
const Setting = require('../models/setting');
require('../config/cloudinary');

userRouter.post(
  '/addStudent',
  passport.authenticate('jwt', { session: false }),
  upload.fields([{ name: 'avatar', maxCount: 1 }]),
  async (req, res) => {
    const { name, job } = req.body;
    let avatar = null;

    if (req.files['avatar'] !== undefined) {
      avatar = await cloudinary.v2.uploader
        .upload(req.files['avatar'][0].path)
        .then(result => {
          return result.secure_url;
        })
        .catch(err => {
          logger.logError('failed to upload poster', err);
          res.sendStatus(500);
        });
    }

    if (!avatar) {
      avatar = await Setting.findOne({}).then(setting => {
        return setting.imageStudent;
      });
    }

    const newStudent = new User({
      name,
      job,
      avatar,
      role: 'student',
    });

    await newStudent
      .save()
      .then(() => {
        logger.logInfo('them user thanh cong');
        return res.status(200).send(newStudent);
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  },
);

userRouter.post(
  '/editStudent',
  passport.authenticate('jwt', { session: false }),
  upload.fields([{ name: 'reAvatar', maxCount: 1 }]),
  async (req, res) => {
    const { name, id, job } = req.body;
    let reAvatar = await User.findById(id).then(user => user.avatar);

    if (req.files['reAvatar'] !== undefined) {
      reAvatar = await cloudinary.v2.uploader
        .upload(req.files['reAvatar'][0].path)
        .then(result => {
          return result.secure_url;
        })
        .catch(err => {
          logger.logError('failed to upload poster', err);
          res.sendStatus(500);
        });
    }

    await User.updateOne({ _id: id }, { $set: { name, job, avatar: reAvatar } }, { upsert: true })
      .then(() => {
        logger.logInfo('edit user thanh cong');
        return res.status(200).send({ id, name, job, avatar: reAvatar });
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  },
);

userRouter.post(
  '/addTeacher',
  passport.authenticate('jwt', { session: false }),
  upload.fields([{ name: 'avatar', maxCount: 1 }]),
  async (req, res) => {
    const { name, job } = req.body;
    let avatar = null;

    if (req.files['avatar'] !== undefined) {
      avatar = await cloudinary.v2.uploader
        .upload(req.files['avatar'][0].path)
        .then(result => {
          return result.secure_url;
        })
        .catch(err => {
          logger.logError('failed to upload poster', err);
          res.sendStatus(500);
        });
    }

    if (!avatar) {
      avatar = await Setting.findOne({}).then(setting => {
        return setting.imageTeacher;
      });
    }

    const newTeacher = new User({
      name,
      job,
      avatar,
      role: 'teacher',
    });

    await newTeacher
      .save()
      .then(() => {
        logger.logInfo('them user thanh cong');
        return res.status(200).send(newTeacher);
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  },
);

userRouter.post(
  '/editTeacher',
  passport.authenticate('jwt', { session: false }),
  upload.fields([{ name: 'reAvatar', maxCount: 1 }]),
  async (req, res) => {
    const { name, id, job } = req.body;
    let reAvatar = await User.findById(id).then(user => user.avatar);

    if (req.files['reAvatar'] !== undefined) {
      reAvatar = await cloudinary.v2.uploader
        .upload(req.files['reAvatar'][0].path)
        .then(result => {
          return result.secure_url;
        })
        .catch(err => {
          logger.logError('failed to upload poster', err);
          res.sendStatus(500);
        });
    }

    await User.updateOne({ _id: id }, { $set: { name, job, avatar: reAvatar } }, { upsert: true })
      .then(() => {
        logger.logInfo('edit user thanh cong');
        return res.status(200).send({ id, name, job, avatar: reAvatar });
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  },
);

userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  return res.status(200).send(users);
});

userRouter.post('/remove', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await User.findOneAndRemove({ _id: req.body.id })
    .then(() => {
      logger.logInfo('xoa thanh cong');
      return res.status(200).send({ id: req.body.id });
    })
    .catch(err => {
      logger.logError('loi ', err);
      return res.sendStatus(500);
    });
});

module.exports = userRouter;
