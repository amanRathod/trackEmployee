const Company = require('../../../../model/company')

exports.listCompany = async (req, res) => {
    try {
        const allCompany = await Company.find({})
            .populate('currentEmployees')
            .populate('pastEmployees')

        res.status(200).json({
            type: 'success',
            allCompany,
        })
    } catch (err) {
        return res.status(500).json({
            type: 'error',
            message: 'Server is Invalid',
        })
    }
}

exports.createCompany = async (req, res) => {
  try {
    const { companyEmail, companyName, companyDescription } = req.body;
    
    // created company by one of the employee
    const company = new Company({
      companyEmail,
      companyName,
      companyDescription,
      companyCreated: req.user._id,
    });
    await company.save();
    
    res.status(200).json({
<<<<<<< HEAD
      company
=======
      type: 'success',
      message: 'You have successfully created company',
      company,
>>>>>>> 53a7a5843d75005efec012ab0bb064a548de358a
    });

  } catch (err) {
    return res.status(500).json({
      type: 'error',
      message: 'Server is Invalid',
  })
  }
}
