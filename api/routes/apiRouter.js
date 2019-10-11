const apiRouter = require('express').Router();
const Test = require('../models/test');

apiRouter.get('/data', async (req, res) => {
  const newText = new Test({
    text: 'tin dep try',
  });
  await newText.save();

  return res.status(200).send({ success: true });
});

module.exports = apiRouter;
