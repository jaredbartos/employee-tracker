// Import required module
const DatabaseQuery = require('./sql');

// Create new instance of DatabaseQuery to use included functions
const dbQuery = new DatabaseQuery;

// Functions to populate choices for appropriate prompts
const roleChoice = async () => {
  const roles = await dbQuery.getRoles();
  return roles;
};

const departmentChoice = async () => {
  const departments = await dbQuery.getDepartments();
  return departments;
}

const employeeChoice = async () => {
  const employees = await dbQuery.getEmployees();
  return employees;
};

const managerChoice = async () => {
  const employees = await dbQuery.getEmployees();
  employees.push('None');
  return employees;
};

// Questions object for tasks prompts
const questions = {
  task: [
    {
      type: 'list',
      name: 'task',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View Utilized Department Budgets',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'Delete Department',
        'Delete Role',
        'Delete Employee',
        'Exit'
      ],
    }
  ],
  department: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the new department?'
    }
  ],
  role: [
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
      choices: departmentChoice,
    }
  ],
  newEmployee: [
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
      choices: managerChoice,
    }
  ],
  updateEmployeeRole: [
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
  ],
  updateEmployeeManager: [
    {
      type: 'list',
      name: 'employee',
      message: 'What employee would you like to update?',
      choices: employeeChoice,
    },
    {
      type: 'list',
      name: 'manager',
      message: "Who is the employee's new manager?",
      choices: managerChoice,
    }
  ],
  deleteDepartment: [
    {
      type: 'list',
      name: 'department',
      message: 'Which department would you like to delete?',
      choices: departmentChoice,
    }
  ],
  deleteRole: [
    {
      type: 'list',
      name: 'role',
      message: 'Which role would you like to delete?',
      choices: roleChoice,
    }
  ],
  deleteEmployee: [
    {
      type: 'list',
      name: 'employee',
      message: 'Which employee would you like to delete?',
      choices: employeeChoice,
    }
  ],
};

// Export module
module.exports = questions;