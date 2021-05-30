const Employee = require('../models/employeeModel');

// Filter employees

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; // queryString = req.query

    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach((elt) => delete queryObj[elt]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => '$' + match
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('name');
    }
    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

const employeeController = {
  getEmployees: async (req, res) => {
    try {
      const features = new APIfeatures(Employee.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const employees = await features.query;

      res.json({
        status: 'succes',
        result: employees.length,
        employees: employees,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createEmployee: async (req, res) => {
    try {
      // only admin can create, delete and update employees
      const { name, email } = req.body;
      const employee = await Employee.findOne({ email });
      if (employee)
        return res.status(400).json({ msg: 'This employee allready exists' });

      const newEmployee = new Employee({ name, email });
      await newEmployee.save();
      res.json('Created an employee');
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteEmployee: async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Deleted employee' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateEmployee: async (req, res) => {
    try {
      const { name } = req.body;
      await Employee.findByIdAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: 'Updated employee' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = employeeController;
