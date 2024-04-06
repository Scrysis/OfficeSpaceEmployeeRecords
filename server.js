// Pull in the necessary imports
const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const questions = require("./questions")();
inquirer.registerPrompt("search-list", require("inquirer-search-list"));

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

const prompt = inquirer.prompt;

/* const { menu } = async function menQues (){
    return await questions.menuQuestion();}; */

const viewDep = "View all departments";
const viewRol = "View all roles";
const viewEmp = "View all employees";
const addDep = "Add a department";
const addRole = "Add a role";
const addEmp = "Add an employee";
const upEmp = "Update an employee";
const exit = "Exit";

const menuQues = [
  {
    name: "menuSelect",
    type: "list",
    message: "Please select a menu option:",
    choices: [viewDep, viewRol, viewEmp, addDep, addRole, addEmp, upEmp, exit],
  },
];

const doStuff = async (menu) => {
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
      console.log("department block");
      inquirer
        .prompt([
          {
            name: "departmentName",
            type: "input",
            message: "Please enter the name of the department you wish to add:",
          },
        ])
        .then((data) => {
          db.query(
            `INSERT INTO department (name) values (?)`,
            data.departmentName,
            function (err, results) {
              if (err) {
                console.log(err);
              } else {
                viewDepartments();
              }
            }
          );
        });
      break;
    case addRole:
      inquirer.prompt(questions.addRoleQuestion()).then((data) => {
        addRoleDB(data);
      });
      break;
    case addEmp:
      inquirer.prompt(questions.addEmployeeQuestion()).then((data) => {
        addEmployee(data);
      });
      break;
    case upEmp:
      viewEmployees();
      inquirer.prompt(questions.updateEmployeeQuestion()).then((data) => {
        updateEmployee(data);
      });
      viewEmployees();
      break;
  }
};

function runAddDep() {
  const { newDep } = async function depQues() {
    return await questions.addDepartmentQuestion();
  };
  addDepartment(newDep.departmentName);
}

function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employees", function (err, results) {
    console.table(results);
  });
}

function addDepartment(depName) {
  db.query(
    `INSERT INTO department (name) values (?)`,
    depName,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        viewDepartments();
      }
    }
  );
}

function addRoleDB(roleAnswers) {
  const roleData = [
    roleAnswers.roleTitle,
    roleAnswers.roleSalary,
    roleAnswers.departmentID,
  ];
  var salary = Number(roleAnswers.roleSalary);
  var depId = Number(roleAnswers.departmentID);
  db.query(
    `INSERT INTO role (title, salary, department_id) VALUES ('${roleAnswers.roleTitle}', ${salary}, ${depId})`,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        viewRoles();
      }
    }
  );
}

function addEmployee(data) {
var roleid = Number(data.roleId);
var managerid = Number(data.managerID);
  db.query(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id) values ('${data.employeeFirstName}', '${data.employeeLastName}', ${roleid}, ${managerid})`,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        viewEmployees();
      }
    }
  );
}

function updateEmployee(data) {

  var changeId = Number(data.employeeID);
  var roleid = Number(data.roleID);
  var managerid = Number(data.managerID);


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
                        first_name = '${data.employeeFirstName}',
                        last_name = '${data.employeeLastName}',
                        role_id = ${roleid},
                        manager_id = ${managerid}
                       WHERE
                        id = ${changeId}`;

  db.query(sqlShow, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });

  db.query(sqlChange, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
  db.query(sqlShow, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
}

const init = async () => {
  let menu;
  menu = (await prompt(menuQues)).menuSelect; // Get their choice by awaiting a prompt
  doStuff(menu);
  // While the user has not chosen to exit...
  /* while (menu != "Exit") {
        menu = (await prompt(menuQues)).menuSelect; // Get their choice by awaiting a prompt
        doStuff(menu);
    } */
};

init();
