const inquirer = require('inquirer');
const questions = require('./questions');
const Tasks = require('./tasks');

const tasks = new Tasks;

const promptFunc = async () => {
  const answers = await inquirer.prompt(questions.task);

  switch (answers.task) {
    case 'View All Departments':
      tasks.viewAllDepartments();
      break;
    case 'View All Roles':
      tasks.viewAllRoles();
      break;
    case 'View All Employees':
      tasks.viewAllEmployees();
  }
};