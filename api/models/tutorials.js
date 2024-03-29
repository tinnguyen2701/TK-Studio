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
  subject: {
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
  imageObject: {
    type: String,
    required: true,
  },
  imageContent: {
    type: String,
    required: true,
  },
  imageRequirement: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
  },
});

module.exports = mongoose.model('Tutorial', tutorialSchema);
