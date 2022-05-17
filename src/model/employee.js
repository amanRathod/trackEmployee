const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },
  phone: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  zip: {
    type: String,
  },
  pastCompany: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: Date.now,
    },
  }],
  currentCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
}, {
  timestamps: true,
})

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;
