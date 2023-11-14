const inquirer = require('inquirer');
const questions = require('./questions');


const promptFunc = async () => {
  const answers = await inquirer.prompt(questions.task);
  console.log(answers);
};