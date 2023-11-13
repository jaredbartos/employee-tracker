const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'UKF.h_Nd6u3no7ad7pJo3w2A',
    database: 'company_db'
  }
);

class DatabaseQuery {
  showDepartments = () => db.query('SELECT * FROM department ORDER BY id;', (err, results) =>
    console.log(results));

  showRoles = () =>
    db.query(`SELECT role.id AS ID, role.title AS Title, department.name AS Department, role.salary AS Salary
FROM role
LEFT JOIN department
ON department.id = role.department_id
ORDER BY role.id;`, (err, results) => console.log(results));

  showEmployees = () =>
    db.query(`SELECT B.id AS ID, B.first_name AS "First Name", B.last_name AS "Last Name", role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(A.first_name, " ", A.last_name) AS Manager
FROM employee B
LEFT JOIN employee A
ON B.manager_id = A.id
LEFT JOIN role
ON B.role_id = role.id
LEFT JOIN department
ON role.department_id = department.id
ORDER BY ID;`, (err, results) => console.log(results));

  addDepartment = (name) =>
    db.query(`INSERT INTO department (name) VALUES (${name});`, (err, results) => console.log('Added new department'));

  addRole = (name, salary, department) =>
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (${name}, ${salary}, ${department});`, (err, results) =>
    console.log('Added new role'));

  addEmployee = (firstName, lastName, role, manager) =>
    db.query(`INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES (${firstName}, ${lastName}, ${role}, ${manager});`, (err, results) =>
    console.log('Added new employee'));

  updateRole = (employee, role) =>
    db.query(`UPDATE employee SET role_id = ${role} WHERE id = ${employee};`, (err, results) => console.log("Updated employee's role"));
};