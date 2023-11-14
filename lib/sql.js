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

    return rows;
  };

  getDepartments = async () => {
    const [rows, fields] = await db.query('SELECT name FROM department ORDER BY id'); 
    let departments = [];
    for (const row of rows) {
      departments.push(row.name);
    };

    return departments;
  };

  getDepartmentID = async (department) => {
    const [rows, fields] = await db.query(`SELECT id FROM department WHERE name = '${department}';`); 
    const id = rows[0].id;

    return id;
  }

  showRoles = async () => {
    const [rows, fields] = await db.query(`SELECT role.id AS ID, role.title AS Title, department.name AS Department, role.salary AS Salary
FROM role
LEFT JOIN department
ON department.id = role.department_id
ORDER BY role.id;`)

    return rows;
  };


  getRoles = async () => {
    const [rows, fields] = await db.query('SELECT title FROM role ORDER BY id');
    let roles = [];
    for (const row of rows) {
      roles.push(row.title);
    };

    return roles;
  };

  getRoleID = async (role) => {
    const [rows, fields] = await db.query(`SELECT id FROM role WHERE title = '${role}';`);  
    const id = rows[0].id;

    return id;
  }

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

    return rows;
  };

  getEmployees = async () => {
    const [rows, fields] = await db.query('SELECT CONCAT(first_name, " ", last_name) AS name FROM employee ORDER BY id');
    let employees = [];
    for (const row of rows) {
      employees.push(row.name);
    };

    return employees;
  }

  getEmployeeID = async (firstName, lastName) => {
    const [rows, fields] = await db.query(`SELECT id FROM employee WHERE first_name = '${firstName}' AND last_name = '${lastName}';`);    
    const id = rows[0].id;

    return id;
  }

  addDepartment = (name) =>
    db.query(`INSERT INTO department (name) VALUES ('${name}');`);

  addRole = (title, salary, department) =>
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${salary}, ${department});`)

  addEmployee = (firstName, lastName, role, manager) =>
    db.query(`INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${role}, ${manager});`)

  updateEmpRole = (employee, role) =>
    db.query(`UPDATE employee SET role_id = ${role} WHERE id = ${employee};`)
};

module.exports = DatabaseQuery;