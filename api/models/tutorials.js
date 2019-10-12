const mongoose = require('mongoose');

const { Schema } = mongoose;

const tutorialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  subject: {
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
  studients: [
    {
      nameAuthor: {
        type: String,
        required: true,
      },
      nameArt: {
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
