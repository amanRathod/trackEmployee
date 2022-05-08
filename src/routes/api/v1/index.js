const express = require('express');
const router = express.Router();

router.use('/auth', require('./employee/auth'));
router.use('/employee', require('./employee/employee'));
router.use('/company', require('./company/company'));

module.exports = router;

