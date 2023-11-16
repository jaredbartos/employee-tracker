// Import required modules
const inquirer = require('inquirer');
const questions = require('./questions');
const Tasks = require('./tasks');

// Create new instance of Tasks to use included functions
const tasks = new Tasks;

// Set functions for prompts needed for each task
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

const updateEmpRolePrompt = async () => {
  const answers = await inquirer.prompt(questions.updateEmployeeRole);
  const { employee, role } = answers;

  tasks.updateEmployeeRole(employee, role);
};

const updateEmpManagerPrompt = async () => {
  const answers = await inquirer.prompt(questions.updateEmployeeManager);
  const { employee, manager } = answers;

  tasks.updateEmployeeManager(employee, manager);
};

const deleteDeptPrompt = async () => {
  const answers = await inquirer.prompt(questions.deleteDepartment);
  const department = answers.department;

  tasks.deleteDepartment(department);
};

const deleteRolePrompt = async () => {
  const answers = await inquirer.prompt(questions.deleteRole);
  const role = answers.role;

  tasks.deleteRole(role);
};

const deleteEmployeePrompt = async () => {
  const answers = await inquirer.prompt(questions.deleteEmployee);
  const employee = answers.employee;

  tasks.deleteEmployee(employee);
}

// Switch statement to execute prompts for functions based on initial selection
// Then log comment to console, if applicable, and prompt for task again
const taskHandler = (answers) => {
  switch (answers.task) {
    case 'View All Departments':
      tasks.viewAllDepartments()
        .then(() => taskPrompt());
      break;
    case 'View Utilized Department Budgets':
      tasks.viewDepartmentBudgets()
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
    case 'Update Employee Manager':
      updateEmpManagerPrompt()
        .then(() => console.log('******\n\nEmployee updated\n\n******'))
        .then(() => taskPrompt());
      break;
    case 'Delete Department':
      deleteDeptPrompt()
        .then(() => console.log('******\n\nDepartment deleted\n\n******'))
        .then(() => taskPrompt());
      break;
    case 'Delete Role':
      deleteRolePrompt()
        .then(() => console.log('******\n\nRole deleted\n\n******'))
        .then(() => taskPrompt());
      break;
    case 'Delete Employee':
      deleteEmployeePrompt()
        .then(() => console.log('******\n\nEmployee deleted\n\n******'))
        .then(() => taskPrompt());
      break;
    case 'Exit':
      process.exit();
  }
};

// Function for initial inquirer prompt
const taskPrompt = async () => {
  const answers = await inquirer.prompt(questions.task);
  taskHandler(answers);
};

// Export module
module.exports = taskPrompt;