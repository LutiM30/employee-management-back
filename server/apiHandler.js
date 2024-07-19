const { getAbout, setAboutMessage } = require('./about');
const addEmployee = require('./employees/employeeOperation').CREATE;

const getEmployees = require('./employees/employeeOperation').READ;
const updateEmployee = require('./employees/employeeOperation').UPDATE;
const getEmployee = require('./employees/employeeOperation').READONE;

const deleteEmployee = require('./employees/employeeOperation').DELETE;
const getFilteredEmployees =
  require('./employees/employeeOperation').READ_FILTERED;

const GraphQLDate = require('./GraphQLDate');
const getEmployeeTypes = require('./helperAPI/EmployeeTypesOptions');

module.exports = {
  Query: {
    about: getAbout,
    listOfEmployees: getEmployees,
    getEmployee,
    getFilteredEmployees,
    getEmployeeTypes,
  },
  Mutation: {
    setAboutMessage,
    addEmployee,
    deleteEmployee,
    updateEmployee,
  },
  GraphQLDate,
};
