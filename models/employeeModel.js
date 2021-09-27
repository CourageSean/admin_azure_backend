const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uniqe: true,
    },
      UserName: {
      type: String,
      required: false,
      trim: true,
      
    },
    email: {
      type: String,
      required: true,
      trim: true,
      uniqe: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
