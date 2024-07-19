const { uid } = require('uid');

const {
  getDBEmployees,
  addDBEmployee,
  deleteDBEmployee,
  getOneDBEmployee,
  updateDBEmployee,
  getFilteredDBEmployees,
} = require('../dbconnect');

const getEmployees = async () => await getDBEmployees();
const getOneEmployee = async (_, { emp_id }) => await getOneDBEmployee(emp_id);

const addEmployee = async (_, { employee }) => {
  const { firstName, lastName, age, joined, emp_id } = employee;

  // Validation
  if (!firstName) throw new Error('First Name is required');
  if (!lastName) throw new Error('Last Name is required');
  if (age < 20 || age > 70) throw new Error('Age must be between 20 and 70');
  if (!joined) throw new Error('Joining Date is required');

  const newEmployee = {
    ...employee,
    emp_id: emp_id || uid(8),
    joined: new Date(joined),
    created: new Date(),
    status: 1,
  };

  const result = await addDBEmployee(newEmployee);

  if (result.acknowledged) {
    return newEmployee;
  } else {
    throw new Error('Failed to Insert or Update the employee.');
  }
};

const updateEmployee = async (_, { employee }) => {
  try {
    const newEmployee = {
      ...employee,
      status: parseInt(employee.status, 10),
    };

    const result = await updateDBEmployee(newEmployee);

    if (result.modifiedCount > 0) {
      // Fetch the updated employee from the database
      const updatedEmployee = await getOneDBEmployee(newEmployee.emp_id);

      if (!updatedEmployee) {
        throw new Error('Failed to fetch updated employee.');
      }

      return updatedEmployee;
    } else {
      throw new Error('Failed to update the employee. No changes were made.');
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    throw new Error('Failed to update employee: ' + error.message);
  }
};

const deleteEmployee = async (_, { emp_id }) => {
  const result = await deleteDBEmployee(emp_id);

  if (result.acknowledged && result.deletedCount) {
    return 'Employee Deleted';
  } else {
    throw new Error('Failed to delete the employee.');
  }
};

const getFilteredEmployees = async (_, { filters }) => {
  let { searchQuery, type } = filters;
  searchQuery = searchQuery.trim();
  let query = {};

  if (searchQuery) {
    query.$or = [
      { age: { $regex: searchQuery, $options: 'i' } },
      { designation: { $regex: searchQuery, $options: 'i' } },
      { department: { $regex: searchQuery, $options: 'i' } },
      { emp_id: { $regex: searchQuery, $options: 'i' } },
      { firstName: { $regex: searchQuery, $options: 'i' } },
      { lastName: { $regex: searchQuery, $options: 'i' } },
      { type: { $regex: searchQuery, $options: 'i' } },
    ];
  }

  if (type) {
    query.type = type;
  }

  return await getFilteredDBEmployees(query);
};

module.exports = {
  CREATE: addEmployee,
  READ: getEmployees,
  DELETE: deleteEmployee,
  READONE: getOneEmployee,
  UPDATE: updateEmployee,
  READ_FILTERED: getFilteredEmployees,
};
