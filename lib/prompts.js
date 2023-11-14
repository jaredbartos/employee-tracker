const DatabaseQuery = require('./sql');

const dbQuery = new DatabaseQuery;

const taskQuestion = [
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

const departmentQuestion = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of the new department?'
  }
];

const roleQuestion = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of the new role?'
  },
  {
    type: 'input',
    name: 'salary',
    message: 'What is the salary of the new role?'
  },
  {
    type: 'list',
    name: 'department',
    message: 'What department does the role belong to?',
    choices: [
      async () => {
        const departments = await dbQuery.getDepartments();
        return departments;
      }
    ],
  }
];
