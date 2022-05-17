/* eslint-disable max-len */
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../../../../model/employee');
const redis = require('../../../../../redis-client');

exports.register = async(req, res) => {
  try {
    // validate user input data
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        type: 'warning',
        message: error.array()[0].msg,
      });
    }

    const { email, password} = req.body;

    const emailExists = await Employee.findOne({email: email});
    if (emailExists){
      res.status(203).json({
        type: 'error',
        message: 'User already exists, Please try with unregister Email',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Employee.create({
      ...req.body,
      password: hashedPassword,
      image: 'https://blog-dev-sample.s3.amazonaws.com/index.png',
    });

    res.status(200).json({
      type: 'success',
      message: 'User successfully created',
    });

  } catch (err) {
    return res.status(500).json({
      type: 'error',
      message: 'Server is Invalid',
    });
  }
};

exports.login = async(req, res) => {
  try {
    // validate user input data
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        type: 'warning',
        message: error.array()[0].msg,
      });
    }

    // destructure the request body
    const { email, password } = req.body;
<<<<<<< HEAD
    
=======

>>>>>>> 53a7a5843d75005efec012ab0bb064a548de358a
    // verify user email
    const user = await Employee.findOne({email: email});
    if (!user) {
      return res.status(201).json({
        type: 'error',
        message: 'User email or passowrd is incorrect',
      });
    }

<<<<<<< HEAD
    // console.log('here');
=======
>>>>>>> 53a7a5843d75005efec012ab0bb064a548de358a
    // verify User password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(201).json({
        type: 'error',
        message: 'User email or passowrd is incorrect',
      });
    }

    // create jwt token
    const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET_KEY, {
      expiresIn: '2h',
    });

    return res.status(200).json({
      type: 'success',
      message: 'Logged-In successfully',
      token,
      fullName: user.fullName,
      image: user.image,
    });

  } catch (err) {
    return res.status(500).json({
      type: 'error',
      message: 'Server is Invalid',
    });
  }
};

exports.logout = async(req, res) => {
  try {
    const {token, tokenExp} = req;
    redis.setex(`blacklist_${token}`, tokenExp, true);

    res.status(200).json({
      type: 'success',
      message: 'Logged-Out successfully',
    });
  } catch (err) {
    return res.status(500).json({
      type: 'error',
      message: 'Server is Invalid',
    });
  }
};
