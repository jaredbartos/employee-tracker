// Functions for formatting the table data to display on selection
const formatDepts = async (departments) => {
  const departmentData = [
    ['ID', 'Department']
  ];

  for (const department of departments) {
    const { id, name } = department;
    departmentData.push([id, name]);
  };

  return departmentData;
};

const formatDeptBudgets = async (budgets) => {
  const budgetData = [
    ['ID', 'Department', 'Total Utilized Budget']
  ];

  for (const budget of budgets) {
    const { id, name, utilizedBudget } = budget;
    budgetData.push([id, name, utilizedBudget]);
  };

  return budgetData;
}

const formatRoles = async (roles) => {
  const roleData = [
    ['ID', 'Title', 'Department', 'Salary']
  ];

  for (const role of roles) {
    const { id, title, department, salary } = role;
    roleData.push([id, title, department, salary]);
  };

  return roleData;
};

const formatEmployees = async (employees) => {
  const employeeData = [
    ['ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager']
  ];

  for (const employee of employees) {
    const { id, firstName, lastName, title, department, salary, manager } = employee;
    employeeData.push([id, firstName, lastName, title, department, salary, manager]);
  };

  return employeeData;
}

// Export module
module.exports = {
  formatDepts,
  formatRoles,
  formatEmployees,
  formatDeptBudgets,
};