const DatabaseQuery = require('./sql');

const dbQuery = new DatabaseQuery;

class Tasks {
  viewAllDepartments = async () => {
    const departments = await dbQuery.showDepartments();

    console.log(departments);
  };

  viewAllRoles = async () => {
    const roles = await dbQuery.showRoles();

    console.log(roles);
  };

  viewAllEmployees = async () => {
    const employees = await dbQuery.showEmployees();

    console.log(employees);
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
    const managerID = await dbQuery.getEmployeeID(first, last);

    dbQuery.addEmployee(firstName, lastName, roleID, managerID);
  };

  updateEmployeeRole = async (employee, role) => {
    const nameArray = employee.split(' ');
    const [first, last] = nameArray;
    const employeeID = await dbQuery.getEmployeeID(first, last);
    const roleID = await dbQuery.getRoleID(role);

    dbQuery.updateEmpRole(employeeID, roleID);
  };
};