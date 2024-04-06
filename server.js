// Pull in the necessary imports
const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const questions = require("./questions")();

const PORT = process.env.PORT || 3001;

const app = express();
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "password",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

// Express middleware; not sure if I need it yet
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { menu } = await questions.menuQuestion();

switch (menu) {
  case viewDep:
    viewDepartments();
    break;
  case viewRol:
    viewRoles();
    break;
  case viewEmp:
    viewEmployees();
    break;
  case addDep:
    const {newDep} = await questions.addDepartmentQuestion();
    addDepartment(newDep.departmentName);
    break;
  case addRole:
    const {newRole} = await questions.addRoleQuestion();
    addRoleDB(newRole.roleTitle, newRole.roleSalary, newRole.departmentID);
    break;
  case addEmp:
    const{newEmployee} = await questions.addEmployeeQuestion();
    addEmployee(newEmployee.employeeFirstName, newEmployee.employeeLastName, newEmployee.roleId, newEmployee.managerID);
    break;
  case upEmp:
    viewEmployees();
    const {updateEmp} = await questions.updateEmployeeQuestion();
    updateEmployee(updateEmp.employeeID, updateEmp.employeeFirstName, updateEmp.employeeLastName, updateEmp.roleID, updateEmp.managerID);
    viewEmployees();
    break;
}

function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.log(results);
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.log(results);
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employees", function (err, results) {
    console.log(results);
  });
}

function addDepartment(depName) {
  db.query(
    `INSERT INTO department (name) values (${depName})`,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
      }
    }
  );
}

function addRoleDB(roleTitle, roleSalary, depId) {
  db.query(
    `INSERT INTO role (title, salary, department_id) values (${roleTitle}, ${roleSalary}, ${depId})`,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
      }
    }
  );
}

function addEmployee(firstname, lastname, roleid, managerid) {
  db.query(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id) values (${firstname}, ${lastname}, ${roleid}, ${managerid})`,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
      }
    }
  );
}

function updateEmployee(changeId, firstname, lastname, roleid, managerid) {
  const sqlShow = `SELECT
                        first_name,
                        last_name,
                        role_id,
                        manager_id
                    FROM
                        employees
                    WHERE
                        id = ${changeId}`;

  const sqlChange = `UPDATE employees
                       SET
                        first_name = ${firstname},
                        last_name = ${lastname},
                        role_id = ${roleid},
                        manager_id = ${managerid}
                       WHERE
                        id = ${changeId}`;

  db.query(sqlShow, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });

  db.query(sqlChange, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
  db.query(sqlShow, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
}
