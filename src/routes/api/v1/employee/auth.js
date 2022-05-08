/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const Joi = require('joi');
const Employee = require('../../../../controller/api/v1/employee/auth');
const reset_password = require('../../../../controller/api/v1/employee/resetPassword');
const ratelimiter = require('../../../../../rate-limiter');
const validate = require('../../../../middleware/validate');
const authenticateUserToken = require('../../../../middleware/user');

const personLogin = Joi.object()
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

router.post('/login', validate(personLogin), ratelimiter({ secondsWindow: 10, allowedHits: 4 }), Employee.login);

router.post('/register', [
  body('fullName').not().isEmpty().withMessage('Full name is required'),
  check('email').isEmail(),
  check('password').isLength({ min: 8 }),
], Employee.register);

router.post('/forgotPassword', [
  body('email').not().isEmpty().withMessage('Email is required'),
], reset_password.forgotPassword);

router.put('/resetPassword', [
  body('password').not().isEmpty().withMessage('Password is required'),
  body('token').not().isEmpty().withMessage('Token is required'),
], reset_password.resetPassword);

router.get('/logout', authenticateUserToken, Employee.logout);

module.exports = router;
