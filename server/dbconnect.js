require('dotenv').config();
const { DB_URL } = process.env;

const { MongoClient } = require('mongodb');
let db = null;
let employeeCollection = null;

const connenct2DB = async () => {
  const client = new MongoClient(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log('database connected');
  db = client.db('fullstackdb');

  initOnce();
};

const initOnce = async () => {
  employeeCollection = db.collection('employees');

  await employeeCollection.createIndex({ status: 1 }, { unique: false });
  await employeeCollection.createIndex({ owner: 1 }, { unique: false });
  await employeeCollection.createIndex({ created: 1 }, { unique: false });
};

const getDBEmployees = async () => {
  const pipeline = [
    { $sample: { size: await employeeCollection.countDocuments() } },
  ];
  return await employeeCollection.aggregate(pipeline).toArray();
};

const getOneDBEmployee = async (emp_id) =>
  await employeeCollection.findOne({ emp_id });

const addDBEmployee = async (employee) => {
  try {
    return await employeeCollection.insertOne(employee);
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const updateDBEmployee = async (employee) => {
  const query = { emp_id: employee.emp_id };
  const update = { $set: employee };

  try {
    if (employee.emp_id) {
      const result = await employeeCollection.updateOne(query, update);
      if (result.matchedCount === 0) {
        throw new Error('No employee found with the given emp_id');
      }
      return result;
    } else {
      throw new Error('Employee ID is required');
    }
  } catch (error) {
    console.error('Error in updateDBEmployee:', error);
    throw error;
  }
};

const deleteDBEmployee = async (emp_id) => {
  const dbEmployee = await employeeCollection.findOne({ emp_id, status: 0 });
  if (dbEmployee) {
    return await employeeCollection.deleteOne({ emp_id });
  } else {
    return "Can't Delete Employee He is Still Working!";
  }
};

const getFilteredDBEmployees = async (filters) =>
  await employeeCollection.find(filters).toArray();

const getEmployeeTypesDB = async () => {
  const pipeline = [
    { $project: { type: 1, _id: 0 } },
    { $group: { _id: '$type' } },
  ];

  const result = await employeeCollection.aggregate(pipeline).toArray();
  return result.map((doc) => doc._id).filter((value) => value != null);
};

module.exports = {
  getDBEmployees,
  initOnce,
  connenct2DB,
  addDBEmployee,
  deleteDBEmployee,
  getOneDBEmployee,
  updateDBEmployee,
  getFilteredDBEmployees,
  getEmployeeTypesDB,
};
