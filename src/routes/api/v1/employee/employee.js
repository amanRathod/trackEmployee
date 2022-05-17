const express = require('express');
const router = express.Router();
// const {check } = require('express-validator');
const Joi = require('joi');
const Company = require('../../../../controller/api/v1/company/company');
const EmployeeCompany = require('../../../../controller/api/v1/employee/employee')
const validate = require('../../../../middleware/validate');
const authenticateUserToken = require('../../../../middleware/user');

const company = Joi.object()
  .keys({
    companyEmail: Joi.string().email().required(),
    companyName: Joi.string().required(),
    companyDescription: Joi.string().min(8).required(),
  });


router.post('/join-company/:companyId', [
  // check('companyId').isMongoId(),
  // body('companyId').not().isEmpty().withMessage('company Id is  required'),
], authenticateUserToken, EmployeeCompany.join);

router.post('/leave-company/:companyId', [
  // check('companyId').isMongoId(),
], authenticateUserToken, EmployeeCompany.leave);

router.post('/create-company', validate(company), authenticateUserToken, Company.createCompany);

router.get('/employee-data', authenticateUserToken, EmployeeCompany.employeeData)

module.exports = router;
