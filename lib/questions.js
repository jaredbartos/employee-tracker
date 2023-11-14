const DatabaseQuery = require('./sql');

const dbQuery = new DatabaseQuery;

const roleChoice = async () => {
  const roles = await dbQuery.getRoles();
  return roles;
};

const employeeChoice = async () => {
  const employees = await dbQuery.getEmployees();
  return employees;
};

const task = [
  {
    type: 'list',
    name: 'task',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role'
    ],
  }
];

const department = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of the new department?'
  }
];

const role = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of the new role?'
  },
  {
    type: 'number',
    name: 'salary',
    message: 'What is the salary of the new role?'
  },
  {
    type: 'list',
    name: 'department',
    message: 'What department does the role belong to?',
    choices: roleChoice,
  }
];

const newEmployee = [
  {
    type: 'input',
    name: 'firstName',
    message: "What is the employee's first name?",
  },
  {
    type: 'input',
    name: 'lastName',
    message: "What is the employee's last name?",
  },
  {
    type: 'list',
    name: 'role',
    message: "What is the employee's role?",
    choices: roleChoice,
  },
  {
    type: 'list',
    name: 'manager',
    message: "Who is the employee's manager?",
    choices: employeeChoice,
  }
];

const updateEmployee = [
  {
    type: 'list',
    name: 'employee',
    message: 'What employee would you like to update?',
    choices: employeeChoice,
  },
  {
    type: 'list',
    name: 'role',
    message: "What is the employee's new role?",
    choices: roleChoice,
  }
];

module.exports = {
  task,
  department,
  role,
  newEmployee,
  updateEmployee,
};