const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'UKF.h_Nd6u3no7ad7pJo3w2A',
  database: 'company_db',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});


class DatabaseQuery {
  showDepartments = async () => {
    const [rows, fields] = await db.query('SELECT * FROM department ORDER BY id;');

    console.log(rows);
  };

  showRoles = async () => {
    const [rows, fields] = await db.query(`SELECT role.id AS ID, role.title AS Title, department.name AS Department, role.salary AS Salary
FROM role
LEFT JOIN department
ON department.id = role.department_id
ORDER BY role.id;`)

    console.log(rows);
  };

  getDepartments = async () => {
    const [rows, fields] = await db.query('SELECT name FROM department ORDER BY id');
  
    let departments = []

    for (const row of rows) {
      departments.push(row.name);
    };

    return departments;
  };

  showEmployees = async () => {
    const [rows, fields] = await db.query(`SELECT B.id AS ID, B.first_name AS "First Name", B.last_name AS "Last Name", role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(A.first_name, " ", A.last_name) AS Manager
FROM employee B
LEFT JOIN employee A
ON B.manager_id = A.id
LEFT JOIN role
ON B.role_id = role.id
LEFT JOIN department
ON role.department_id = department.id
ORDER BY ID;`)

    console.log(rows);
  };

  addDepartment = (name) =>
    db.query(`INSERT INTO department (name) VALUES ('${name}');`);

  addRole = (name, salary, department) =>
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (${name}, ${salary}, ${department});`)

  addEmployee = (firstName, lastName, role, manager) =>
    db.query(`INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES (${firstName}, ${lastName}, ${role}, ${manager});`)

  updateRole = (employee, role) =>
    db.query(`UPDATE employee SET role_id = ${role} WHERE id = ${employee};`)
};

module.exports = DatabaseQuery;