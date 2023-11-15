const inquirer = require('inquirer');
const questions = require('./questions');
const Tasks = require('./tasks');

const tasks = new Tasks;


const prompt = async () => {
  const answers = await inquirer.prompt(questions.task);

  switch (answers.task) {
    case 'View All Departments':
      tasks.viewAllDepartments()
        .then(() => prompt());
      break;
    case 'View All Roles':
      tasks.viewAllRoles()
        .then(() => prompt());
      break;
    case 'View All Employees':
      tasks.viewAllEmployees()
        .then(() => prompt());
  }
};