const mongoose = require('mongoose');

const { Schema } = mongoose;

const videoSchema = new Schema({
  poster: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Video', videoSchema);
