const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: {
    type: String, 
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  companyDescription: {
    type: String,
    required: true,
  },
  companyCreated: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  companyAddress: {
    type: String,
    default: '',
  },
  companyType: {
    type: String,
    default: 'Private',
    enum: ['Private', 'Public'],
  },
  companyWebsite: {
    type: String,
    default: '',
  },
  companyPhone: {
    type: String,
    default: '',
  },
  companyLogo: {
    type: String,
    default: '',
  },
  currentEmployees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  }],
  pastEmployees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  }],
}
, {
  timestamps: true,
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;