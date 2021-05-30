const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    uniqe: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    uniqe: true,
  },
});

module.exports = mongoose.model('Employee', employeeSchema);
