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

const taskHandler = (answers) => {
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
        .then(() => console.log('******\n\nNew department added\n\n******'))
        .then(() => taskPrompt());
      break;
    case 'Add Role':
      rolePrompt()
        .then(() => console.log('******\n\nNew role added\n\n******'))
        .then(() => taskPrompt());
      break;
    case 'Add Employee':
      addEmployeePrompt()
        .then(() => console.log('******\n\nNew employee added\n\n******'))
        .then(() => taskPrompt());
      break;
    case 'Update Employee Role':
      updateEmpRolePrompt()
        .then(() => console.log('******\n\nEmployee updated\n\n******'))
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