const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    uniqe: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    required: true,
    type: String,
    default: 'worker',
  },
});

module.exports = mongoose.model('Members', memberSchema);
