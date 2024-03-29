const mongoose = require('mongoose');

const { Schema } = mongoose;

const settingSchema = new Schema({
  imageStudent: {
    type: String,
    required: true,
  },
  imageTeacher: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
  },
});

module.exports = mongoose.model('Setting', settingSchema);
