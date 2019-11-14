const PostRouter = require('express').Router();
const cloudinary = require('cloudinary');
const upload = require('../config/multer');
const logger = require('../utils/logger');
const Post = require('../models/post');
require('../config/cloudinary');

PostRouter.post('/add', upload.fields([{ name: 'images[]', maxCount: 100 }]), async (req, res) => {
  const { title, description, videos, tags, isPopulate } = req.body;

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

  if (!title) {
    logger.logError('title was required!');
    return res.status(400).send('title was required!');
  }
  const newPost = new Post({
    title,
    description,
    images,
    videos,
    tags,
    isPopulate,
  });

  await newPost
    .save()
    .then(() => {
      logger.logInfo('them Post thanh cong');
      return res.status(200).send(newPost);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});

PostRouter.post('/edit', upload.fields([{ name: 'images[]', maxCount: 100 }]), async (req, res) => {
  const { title, description, videos, tags, isPopulate, id, displayImages } = req.body;

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

  images = images.concat(displayImages);

  if (!title) {
    logger.logError('title was required!');
    return res.status(400).send('title was required!');
  }

  await Post.updateOne(
    { _id: id },
    { $set: { title, description, isPopulate, images, videos, tags } },
  )
    .then(() => {
      logger.logInfo('update Post thanh cong');
      return res.status(200).send({ id, title, description, isPopulate, images, videos, tags });
    })
    .catch(err => {
      logger.logError('update post went wrong', err);
      return res.status(500).send(err);
    });
});

PostRouter.get('/', async (req, res) => {
  await Post.find({})
    .then(posts => {
      return res.status(200).send({ posts });
    })
    .catch(err => {
      logger.logError('Get all posts went wrong', err);
      return res.sendStatus(500);
    });
});

PostRouter.post('/remove', async (req, res) => {
  await Post.findByIdAndRemove(req.body.id)
    .then(() => {
      return res.status(200).send({ id: req.body.id });
    })
    .catch(err => {
      logger.logError('Remove post went wrong', err);
      return res.sendStatus(500);
    });
});

module.exports = PostRouter;
