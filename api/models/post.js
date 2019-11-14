const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: Array,
  },
  videos: {
    type: Array,
  },
  tags: {
    type: Array,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  isPopulate: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Post', postSchema);
