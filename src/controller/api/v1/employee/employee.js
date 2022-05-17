<<<<<<< HEAD
// const { validationResult } = require('express-validator');
=======
const { validationResult } = require('express-validator');
>>>>>>> 53a7a5843d75005efec012ab0bb064a548de358a
const Employee = require('../../../../model/employee');
const Company = require('../../../../model/company');

exports.join = async(req, res) => {
  try {
<<<<<<< HEAD
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //   return res.status(422).json({
    //     type: 'warning',
    //     message: error.array()[0].msg,
    //   });
    // }

    // const { companyId } = req.body;
=======
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        type: 'warning',
        message: error.array()[0].msg,
      });
    }

    const { companyId } = req.body;
>>>>>>> 53a7a5843d75005efec012ab0bb064a548de358a

    const employee = await Employee.findById({_id: req.user._id});

      //if employee currentCompany is empty
      if (employee.currentCompany) {
        return res.status(400).json({
          type: 'warning',
          message: 'You can only join one company at a time',
        });
      }

    // added companyId into currentCompany
    await Employee.findByIdAndUpdate({_id: req.user._id}, {
      $set: {
<<<<<<< HEAD
        currentCompany: req.params.companyId,
        startDate: new Date(),
      },
      $pull: {
        pastCompany: req.params.companyId,
=======
        currentCompany: companyId,
        startDate: new Date(),
      },
      $pull: {
        pastCompany: companyId,
>>>>>>> 53a7a5843d75005efec012ab0bb064a548de358a
      }
    })

    // registered employee into compnay
<<<<<<< HEAD
    await Company.findByIdAndUpdate({_id: req.params.companyId}, {
=======
    await Company.findByIdAndUpdate({_id: companyId}, {
>>>>>>> 53a7a5843d75005efec012ab0bb064a548de358a
      $push: {
        currentEmployees: employee._id
      }
    })

    res.status(200).json({
      type: 'success',
      message: 'You have successfully joined',
    });

  }
  catch (err) {
    return res.status(500).json({
      type: 'error',
      message: 'Server is Invalid',
    });
  }
};

// leave company 
exports.leave = async(req, res) => {
  try {
<<<<<<< HEAD
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //   return res.status(422).json({
    //     type: 'warning',
    //     message: error.array()[0].msg,
    //   });
    // }

    // const { companyId } = req.body;
=======
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        type: 'warning',
        message: error.array()[0].msg,
      });
    }

    const { companyId } = req.body;
>>>>>>> 53a7a5843d75005efec012ab0bb064a548de358a

    // added companyId into pastCompany attribute
    await Employee.findByIdAndUpdate({_id: req.user._id}, {
      $addToSet: {
<<<<<<< HEAD
        pastCompany: req.params.companyId,    
=======
        pastCompany: companyId,    
>>>>>>> 53a7a5843d75005efec012ab0bb064a548de358a
      }
    })

    // removed companyId from currentCompany and added into pastCopany array
    const employee = await Employee.findByIdAndUpdate({_id: req.user._id}, {
      $push: {
<<<<<<< HEAD
        pastCompany: req.params.companyId,
=======
        pastCompany: companyId,
>>>>>>> 53a7a5843d75005efec012ab0bb064a548de358a
      }
    })
    employee.currentCompany = null;
    await employee.save();
    
    // updated curretEmploye and pastEmployee of company
<<<<<<< HEAD
    await Company.findByIdAndUpdate({_id: req.params.companyId}, {
=======
    await Company.findByIdAndUpdate({_id: companyId}, {
>>>>>>> 53a7a5843d75005efec012ab0bb064a548de358a
      $pull: {
        currentEmployees: employee._id,
      }, 
      $push: {
        pastEmployees: employee._id,
      },
      $set: {
        endDate: new Date(),
      }
    })

    res.status(200).json({
      type: 'success',
      message: 'You have successfully left the company',
    });

  }
  catch (err) {
    return res.status(500).json({
      type: 'error',
      message: 'Server is Invalid',
    });
  }
};

exports.employeeData = async(req, res) => {
  try {

    // send employee data based on employee token(private) 
    const employee = await Employee.findById({_id: req.user._id}).populate('pastCompany').populate('currentCompany');

    res.status(200).json({
      type: 'success',
      employee,
    });
  }
  catch (err) {
    return res.status(500).json({
      type: 'error',
      message: 'Server is Invalid',
    });
  }
};
