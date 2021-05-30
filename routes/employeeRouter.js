const router = require('express').Router();
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router
  .route('/employee')
  .get(employeeController.getEmployees)
  .post(employeeController.createEmployee);

router
  .route('/employee/:id')
  .delete(auth, authAdmin, employeeController.deleteEmployee)
  .put(auth, authAdmin, employeeController.updateEmployee);

module.exports = router;
