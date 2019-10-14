const mongoose = require('mongoose');

const { Schema } = mongoose;

const tutorialSchema = new Schema({
  nameCourse: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  object: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  requirement: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  artsTrainer: [
    {
      author: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Tutorial', tutorialSchema);
