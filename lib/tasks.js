const DatabaseQuery = require('./sql');
const { formatDepts, formatRoles, formatEmployees } = require('./format');
const { table } = require('table');

const dbQuery = new DatabaseQuery;

class Tasks {
  viewAllDepartments = async () => {
    const departments = await dbQuery.showDepartments();
    const departmentData = await formatDepts(departments);

    console.log(table(departmentData));
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
    const nameArray = manager.split(' ');
    const [first, last] = nameArray;
    const roleID = await dbQuery.getRoleID(role);

    if (manager !== 'None') {
      const managerID = await dbQuery.getEmployeeID(first, last);
      dbQuery.addEmployee(firstName, lastName, roleID, managerID);
    } else {
      dbQuery.addEmployee(firstName, lastName, roleID);
    };
  };

  updateEmployeeRole = async (employee, role) => {
    const nameArray = employee.split(' ');
    const [first, last] = nameArray;
    const employeeID = await dbQuery.getEmployeeID(first, last);
    const roleID = await dbQuery.getRoleID(role);

    dbQuery.updateEmpRole(employeeID, roleID);
  };
};

module.exports = Tasks;