// Import required modules
const figlet = require('figlet');
const taskPrompt = require('./lib/prompt');

// Function to initialize app
const init = () => {
  // Create title heading
  console.log('\n\n------------------------------------------------------------------------------------------\n\n');
  console.log(figlet.textSync('Employee Tracker'));
  console.log('\n\n------------------------------------------------------------------------------------------\n\n');
  // Initialize inquirer prompts
  taskPrompt();
};

// Initialize app
init();