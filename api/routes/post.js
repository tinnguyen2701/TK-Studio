const PostRouter = require('express').Router();
const cloudinary = require('cloudinary');
const passport = require('passport');
const upload = require('../config/multer');
const logger = require('../utils/logger');
const Post = require('../models/post');
const Setting = require('../models/setting');
require('../config/cloudinary');

PostRouter.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  upload.fields([{ name: 'images[]', maxCount: 100 }]),
  async (req, res) => {
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
  },
);

PostRouter.post(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  upload.fields([{ name: 'images[]', maxCount: 100 }]),
  async (req, res) => {
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
          logger.logError('fail to upload images', err);
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
      .then(async () => {
        var tagsOriginal = await Setting.find({}).then(result => result[0].tags);

        for (var i = 0; i < tags.length; i++) {
          if (!tagsOriginal.includes(tags[i])) {
            tagsOriginal.push(tags[i]);
          }
        }

        await Setting.updateOne({}, { $set: { tags: tagsOriginal } }, { upsert: true });

        logger.logInfo('update Post thanh cong');
        return res.status(200).send({
          post: { id, title, description, isPopulate, images, videos, tags },
          tags: tagsOriginal,
        });
      })
      .catch(err => {
        logger.logError('update post went wrong', err);
        return res.status(500).send(err);
      });
  },
);

PostRouter.get('/', async (req, res) => {
  await Post.find({})
    .sort({ _id: -1 })
    .then(posts => {
      return res.status(200).send({ posts });
    })
    .catch(err => {
      logger.logError('Get all posts went wrong', err);
      return res.sendStatus(500);
    });
});

PostRouter.get('/title/:title', async (req, res) => {
  await Post.find({ title: req.params.title })
    .then(post => {
      return res.status(200).send({ post });
    })
    .catch(err => {
      logger.logError('Get post went wrong', err);
      return res.sendStatus(500);
    });
});

PostRouter.get('/search/:valueSearch', async (req, res) => {
  function bodauTiengViet(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/ /g, '-');
    return str;
  }

  await Post.find({})
    .then(posts => {
      const postsSearch = [];
      posts.map(post =>
        bodauTiengViet(post.title.toLowerCase()).search(
          bodauTiengViet(req.params.valueSearch.toLowerCase()),
        ) > -1
          ? postsSearch.push(post)
          : post,
      );
      return res.status(200).send({ postsSearch });
    })
    .catch(err => {
      logger.logError('find posts to search went wrong', err);
      return res.sendStatus(500);
    });
});

PostRouter.get('/page/:numberPage', async (req, res) => {
  const { numberPage } = req.params;

  await Post.find()
    .sort({ _id: -1 })
    .skip((numberPage - 1) * 5)
    .limit(5)
    .then(posts => {
      return res.status(200).send({ posts });
    })
    .catch(err => {
      logger.logError('Get limit posts went wrong', err);
      return res.sendStatus(500);
    });
});

PostRouter.get('/tags/:tag', async (req, res) => {
  await Post.find({ tags: { $in: [req.params.tag] } })
    .sort({ _id: -1 })
    .then(posts => {
      return res.status(200).send({ posts });
    })
    .catch(err => {
      logger.logError('Get tags posts went wrong', err);
      return res.sendStatus(500);
    });
});

PostRouter.get('/populate', async (req, res) => {
  await Post.find({ isPopulate: true })
    .then(posts => {
      return res.status(200).send({ posts });
    })
    .catch(err => {
      logger.logError('Get all posts populate went wrong', err);
      return res.sendStatus(500);
    });
});

PostRouter.post('/remove', passport.authenticate('jwt', { session: false }), async (req, res) => {
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
