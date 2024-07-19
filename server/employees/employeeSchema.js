const { gql } = require('apollo-server-express');

//

module.exports = gql`
  scalar GraphQLDate

  type Employee {
    emp_id: String!
    firstName: String!
    lastName: String!
    age: Int!
    joined: GraphQLDate!
    designation: String!
    department: String!
    type: String!
    status: Int!
    created: GraphQLDate!
  }

  input Filters {
    searchQuery: String
    type: String
  }

  type DropdownOptions {
    label: String!
    value: String!
  }

  type Query {
    about: String!
    listOfEmployees: [Employee!]!
    getEmployee(emp_id: String!): Employee
    getFilteredEmployees(filters: Filters!): [Employee!]!
    getEmployeeTypes: [DropdownOptions!]
  }

  type Mutation {
    setAboutMessage(message: String!): String
    addEmployee(employee: EmployeeInputs!): Employee!
    updateEmployee(employee: EditEmployeeInputs!): Employee!
    deleteEmployee(emp_id: String!): String
  }

  input EmployeeInputs {
    firstName: String!
    lastName: String!
    age: Int!
    joined: GraphQLDate!
    designation: String!
    department: String!
    type: String!
    emp_id: String
  }
  input EditEmployeeInputs {
    designation: String!
    department: String!
    status: Int!
    emp_id: String!
  }
`;
