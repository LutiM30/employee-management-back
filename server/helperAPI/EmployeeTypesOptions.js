const { getEmployeeTypesDB } = require('../dbconnect');

const typesOfEmployees = [
  { value: 'fullTime', label: 'Full Time' },
  { value: 'partTime', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'intern', label: 'Intern' },
  { value: 'other', label: 'Other' },
  { value: 'Seasonal', label: 'Seasonal' },
];

const getEmployeeTypes = async () => {
  const dbTypes = await getEmployeeTypesDB();
  return dbTypes.map((type) => {
    const matchedType = typesOfEmployees.find(
      (t) => t.value.toLowerCase() === type.toLowerCase()
    );
    return {
      value: type,
      label: matchedType ? matchedType.label : type,
    };
  });
};

module.exports = getEmployeeTypes;
