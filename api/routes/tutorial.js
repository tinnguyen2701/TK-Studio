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
  upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'imageObject', maxCount: 1 },
    { name: 'imageContent', maxCount: 1 },
    { name: 'imageRequirement', maxCount: 1 },
    { name: 'images[]', maxCount: 20 },
  ]),
  async (req, res) => {
    const { nameCourse, description, object, subject, content, requirement, start } = req.body;

    const poster = await cloudinary.v2.uploader
      .upload(req.files['poster'][0].path)
      .then(result => {
        return result.secure_url;
      })
      .catch(err => {
        logger.logError('failed to upload poster', err);
        res.sendStatus(500);
      });

    const imageObject = await cloudinary.v2.uploader
      .upload(req.files['imageObject'][0].path)
      .then(result => {
        return result.secure_url;
      })
      .catch(err => {
        logger.logError('failed to upload imageObject', err);
        res.sendStatus(500);
      });

    const imageContent = await cloudinary.v2.uploader
      .upload(req.files['imageContent'][0].path)
      .then(result => {
        return result.secure_url;
      })
      .catch(err => {
        logger.logError('failed to upload imageContent', err);
        res.sendStatus(500);
      });

    const imageRequirement = await cloudinary.v2.uploader
      .upload(req.files['imageRequirement'][0].path)
      .then(result => {
        return result.secure_url;
      })
      .catch(err => {
        logger.logError('failed to upload imageRequirement', err);
        res.sendStatus(500);
      });

    let images = [];
    if (req.files['images[]'] !== undefined) {
      images = await Promise.all(
        req.files['images[]'].map(file => cloudinary.v2.uploader.upload(file.path)),
      )
        .then(responses => {
          return responses.map(response => response.secure_url);
        })
        .catch(err => {
          logger.logError('faild to upload images', err);
          res.sendStatus(500);
        });
    }

    if (
      !nameCourse ||
      !description ||
      !object ||
      !subject ||
      !content ||
      !requirement ||
      !poster ||
      !imageObject ||
      !imageContent ||
      !imageRequirement
    ) {
      logger.logError('fields was required!');
      return res.status(400).send('fields was required!');
    }

    const newTutorial = new Tutorial({
      nameCourse,
      description,
      poster,
      object,
      subject,
      content,
      requirement,
      start,
      images,
      imageObject,
      imageContent,
      imageRequirement,
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

tutorialRouter.get('/', async (req, res) => {
  const tutorials = await Tutorial.find({});
  return res.status(200).send(tutorials);
});

tutorialRouter.get('/:nameCourse', async (req, res) => {
  const { nameCourse } = req.params;

  const khongDau = str => {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/ /g, '-');
    str = str.replace(/\./g, '-');
    return str;
  };

  await Tutorial.find({})
    .then(tutorials => {
      return Promise.all(
        tutorials.map(item => {
          if (khongDau(item.nameCourse) === nameCourse) {
            return Promise.resolve(item);
          }
          return Promise.resolve(null);
        }),
      ).then(data => {
        const itemTutorial = data.filter(item => item);
        return res.status(200).send(itemTutorial);
      });
    })
    .catch(err => {
      logger.logError('server went wrong!', err);
      return res.sendStatus(500);
    });
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
  upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'imageObject', maxCount: 1 },
    { name: 'imageContent', maxCount: 1 },
    { name: 'imageRequirement', maxCount: 1 },
    { name: 'images[]', maxCount: 20 },
  ]),
  async (req, res) => {
    const { id, nameCourse, description, object, subject, content, requirement, start } = req.body;

    if (!nameCourse || !description || !object || !subject || !content || !requirement || !start) {
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

    let imageObject;
    if (req.files['imageObject'] === undefined) imageObject = tutorialCurrent.imageObject;
    else {
      imageObject = await cloudinary.v2.uploader
        .upload(req.files['imageObject'][0].path)
        .then(result => {
          return result.secure_url;
        })
        .catch(err => {
          logger.logError('failed to upload imageObject', err);
          res.sendStatus(500);
        });
    }

    let imageContent;
    if (req.files['imageContent'] === undefined) imageContent = tutorialCurrent.imageContent;
    else {
      imageContent = await cloudinary.v2.uploader
        .upload(req.files['imageContent'][0].path)
        .then(result => {
          return result.secure_url;
        })
        .catch(err => {
          logger.logError('failed to upload imageContent', err);
          res.sendStatus(500);
        });
    }

    let imageRequirement;
    if (req.files['imageRequirement'] === undefined)
      imageRequirement = tutorialCurrent.imageRequirement;
    else {
      imageRequirement = await cloudinary.v2.uploader
        .upload(req.files['imageRequirement'][0].path)
        .then(result => {
          return result.secure_url;
        })
        .catch(err => {
          logger.logError('failed to upload imageRequirement', err);
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
      {
        $set: {
          nameCourse,
          description,
          object,
          subject,
          content,
          poster,
          images,
          requirement,
          start,
          imageObject,
          imageContent,
          imageRequirement,
        },
      },
    )
      .then(() => {
        logger.logInfo('edit success');
        return res.status(200).send({
          id,
          nameCourse,
          description,
          object,
          subject,
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
