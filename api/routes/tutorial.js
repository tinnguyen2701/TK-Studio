const tutorialRouter = require('express').Router();
const cloudinary = require('cloudinary');
const passport = require('passport');
const upload = require('../config/multer');
const logger = require('../utils/logger');
const Tutorial = require('../models/tutorials');
require('../config/cloudinary');

tutorialRouter.post(
  '/addTutorial',
  passport.authenticate('jwt', { session: false }),
  upload.fields([{ name: 'poster', maxCount: 1 }, { name: 'images[]', maxCount: 20 }]),
  async (req, res) => {
    const { nameCourse, description, object, content, requirement, start } = req.body;

    const poster = await cloudinary.v2.uploader
      .upload(req.files['poster'][0].path)
      .then(result => {
        return result.secure_url;
      })
      .catch(err => {
        logger.logError('failed to upload poster', err);
        res.sendStatus(500);
      });

    const images = await Promise.all(
      req.files['images[]'].map(file => cloudinary.v2.uploader.upload(file.path)),
    )
      .then(responses => {
        return responses.map(response => response.secure_url);
      })
      .catch(err => {
        logger.logError('faild to upload images', err);
        res.sendStatus(500);
      });

    if (!nameCourse || !description || !object || !content || !requirement || !poster || !images) {
      logger.logError('fields was required!');
      return res.status(400).send('fields was required!');
    }

    const newTutorial = new Tutorial({
      nameCourse,
      description,
      poster,
      object,
      content,
      requirement,
      start,
      images,
    });

    await newTutorial
      .save()
      .then(() => {
        logger.logInfo('them tutorial thanh cong');
        return res.status(200).send(newTutorial);
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  },
);

tutorialRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const tutorials = await Tutorial.find({});
  return res.status(200).send(tutorials);
});

tutorialRouter.post(
  '/remove',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await Tutorial.findOneAndRemove({ _id: req.body.id })
      .then(() => {
        logger.logInfo('xoa thanh cong');
        return res.status(200).send({ id: req.body.id });
      })
      .catch(err => {
        logger.logError('loi ', err);
        return res.sendStatus(500);
      });
  },
);

tutorialRouter.post(
  '/editTutorial',
  passport.authenticate('jwt', { session: false }),
  upload.fields([{ name: 'poster', maxCount: 1 }, { name: 'images[]', maxCount: 20 }]),
  async (req, res) => {
    const { id, nameCourse, description, object, content, requirement, start } = req.body;

    if (!nameCourse || !description || !object || !content || !requirement || !start) {
      logger.logError('fields was required!');
      return res.status(400).send('fields was required!');
    }

    const tutorialCurrent = await Tutorial.findById(id);

    let poster;
    if (req.files['poster'] === undefined) poster = tutorialCurrent.poster;
    else {
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

    let images;
    if (req.files['images[]'] === undefined) images = tutorialCurrent.images;
    else {
      images = await Promise.all(
        req.files['images[]'].map(file => cloudinary.v2.uploader.upload(file.path)),
      )
        .then(responses => {
          return responses.map(response => response.secure_url);
        })
        .catch(err => {
          logger.logError('failed to upload images', err);
          res.sendStatus(500);
        });
    }

    await Tutorial.updateOne(
      { _id: id },
      { $set: { nameCourse, description, object, content, poster, images, requirement, start } },
    )
      .then(() => {
        logger.logInfo('edit success');
        return res
          .status(200)
          .send({
            id,
            nameCourse,
            description,
            object,
            content,
            poster,
            images,
            requirement,
            start,
          });
      })
      .catch(err => {
        logger.logError('edit tutorial went wrong!', err);
        return res.sendStatus(500);
      });
  },
);

module.exports = tutorialRouter;
