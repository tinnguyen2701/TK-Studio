const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  job: {
    type: String,
  },
  avatar: {
    type: String,
  },
  avatarDevicePhone: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
