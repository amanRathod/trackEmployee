const express = require('express');
const router = express.Router();
const Company = require('../../../../controller/api/v1/company/company');

router.get('/list-company', Company.listCompany);

module.exports = router;
