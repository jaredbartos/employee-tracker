// Import required modules
const DatabaseQuery = require('./sql');
const { formatDepts, formatRoles, formatEmployees, formatDeptBudgets } = require('./format');
const { table } = require('table');

// Create new instance of DatabaseQuery class to use included functions
const dbQuery = new DatabaseQuery;

// Function for splitting first and last names of employees for database retrieval
const splitName = (name) => {
  const nameArray = name.split(' ');
  const [first, last] = nameArray;

  return [first, last];
}

// Class to hold functions that will be executed on each task selection
class Tasks {
  viewAllDepartments = async () => {
    const departments = await dbQuery.showDepartments();
    const departmentData = await formatDepts(departments);

    console.log(table(departmentData));
  };

  viewDepartmentBudgets = async () => {
    const budgets = await dbQuery.showDepartmentBudgets();
    const budgetData = await formatDeptBudgets(budgets);

    console.log(table(budgetData));
  };

  viewAllRoles = async () => {
    const roles = await dbQuery.showRoles();
    const roleData = await formatRoles(roles);

    console.log(table(roleData));
  };

  viewAllEmployees = async () => {
    const employees = await dbQuery.showEmployees();
    const employeeData = await formatEmployees(employees);

    console.log(table(employeeData));
  };

  createDepartment = async (name) => {
    dbQuery.addDepartment(name);
  };

  createRole = async (title, salary, department) => {
    const departmentID = await dbQuery.getDepartmentID(department);

    dbQuery.addRole(title, salary, departmentID);
  };

  createEmployee = async (firstName, lastName, role, manager) => {
    const roleID = await dbQuery.getRoleID(role);

    if (manager !== 'None') {
      const [first, last] = splitName(manager);
      const managerID = await dbQuery.getEmployeeID(first, last);
      dbQuery.addEmployee(firstName, lastName, roleID, managerID);
    } else {
      dbQuery.addEmployee(firstName, lastName, roleID);
    };
  };

  updateEmployeeRole = async (employee, role) => {
    const [first, last] = splitName(employee);
    const employeeID = await dbQuery.getEmployeeID(first, last);
    const roleID = await dbQuery.getRoleID(role);

    dbQuery.updateEmpRole(employeeID, roleID);
  };

  updateEmployeeManager = async (employee, manager) => {
    const [first, last] = splitName(employee);
    const employeeID = await dbQuery.getEmployeeID(first, last);
    
    let managerID;
    if (manager !== 'None') {
      const [first, last] = splitName(manager);
      managerID = await dbQuery.getEmployeeID(first, last);
    } else {
      managerID = null;
    };

    dbQuery.updateEmpManager(employeeID, managerID);
  };

  deleteDepartment = async (department) => {
    const departmentID = await dbQuery.getDepartmentID(department);

    dbQuery.deleteDepartment(departmentID);
  };

  deleteRole = async (role) => {
    const roleID = await dbQuery.getRoleID(role);

    dbQuery.deleteRole(roleID);
  };

  deleteEmployee = async (employee) => {
    const [first, last] = splitName(employee);
    const employeeID = await dbQuery.getEmployeeID(first, last);

    dbQuery.deleteEmployee(employeeID);
  }
};

// Export module
module.exports = Tasks;