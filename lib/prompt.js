const inquirer = require('inquirer');
const questions = require('./questions');
const Tasks = require('./tasks');

const tasks = new Tasks;

const departmentPrompt = async () => {
  const answers = await inquirer.prompt(questions.department);
  const name = answers.name;

  tasks.createDepartment(name);
};

const rolePrompt = async () => {
  const answers = await inquirer.prompt(questions.role);
  const { title, salary, department } = answers;

  tasks.createRole(title, salary, department);
};

const addEmployeePrompt = async () => {
  const answers = await inquirer.prompt(questions.newEmployee);
  const { firstName, lastName, role, manager } = answers;

  tasks.createEmployee(firstName, lastName, role, manager);
};

const updateEmpRolePrompt = async() => {
  const answers = await inquirer.prompt(questions.updateEmployee);
  const { employee, role } = answers;

  tasks.updateEmployeeRole(employee, role);
};

const taskHandler = async (answers) => {
  switch (answers.task) {
    case 'View All Departments':
      tasks.viewAllDepartments()
        .then(() => taskPrompt());
      break;
    case 'View All Roles':
      tasks.viewAllRoles()
        .then(() => taskPrompt());
      break;
    case 'View All Employees':
      tasks.viewAllEmployees()
        .then(() => taskPrompt());
      break;
    case 'Add Department':
      departmentPrompt()
        .then(() => console.log('New department added'))
        .then(() => taskPrompt());
      break;
    case 'Add Role':
      rolePrompt()
        .then(() => console.log('New role added'))
        .then(() => taskPrompt());
      break;
    case 'Add Employee':
      addEmployeePrompt()
        .then(() => console.log('New employee added'))
        .then(() => taskPrompt());
      break;
    case 'Update Employee Role':
      updateEmpRolePrompt()
        .then(() => console.log('Employee updated'))
        .then(() => taskPrompt());
      break;
    case 'Exit':
      process.exit();
  }
};

const taskPrompt = async () => {
  const answers = await inquirer.prompt(questions.task);

  taskHandler(answers);

};

taskPrompt();

module.exports = taskPrompt;