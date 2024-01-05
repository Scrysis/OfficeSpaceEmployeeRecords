// Pull in the necessary imports
const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");

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

const viewDep = "View all departments";
const viewRol = "View all roles";
const viewEmp = "View all employees";
const addDep = "Add a department";
const addEmp = "Add an employee";
const upEmp = "Update an employee";

/* Extra security from https://github.com/mysqljs/mysql */

inquirer
  .createPromptModule([
    {
      type: "list",
      message: "What would you like to do?",
      name: "menuChoice",
      choices: [viewDep, viewRol, viewEmp, addDep, addEmp, upEmp],
    },
  ])
  .then((response) => {
    var userChoice = response.menuChoice;

    // ...

    switch (response.menuChoice) {
      case viewDep:
        const sqlvDep = "SELECT * FROM department";
        db.query(sqlvDep, function (error, results) {
          if (error) {
            throw error;
          } else {
            console.log(results);
          }
        });
      case viewRol:
        const sqlvRol = "SELECT * FROM role";
        db.query(sqlvRol, function (error, results) {
          if (error) {
            throw error;
          } else {
            console.log(results);
          }
        });
      case viewEmp:
        const sqlvEmp = "SELECT * FROM employees";
        db.query(sqlvEmp, function (error, results) {
          if (error) {
            throw error;
          } else {
            console.log(results);
          }
        });
        case addDep:
            inquirer
            .createPromptModule([
                {
                    type: 'input',
                    message: 'What is the name of the new department?',
                    name: 'depname',
                },
                
            ])
            .then((response)=> {
            const sql1 = `INSERT INTO department(name) VALUES ${response.depname}`;},
            db.query(sql1, function (err, results){
                if (err){
                    console.log(err);
                }
                else{
                    console.log(results);
                }
            })
            );
        case addEmp:
            /* https://stackoverflow.com/questions/75420796/mysql-results-for-inquirer-prompt */
            const departmentArray = [];
            db.query('SELECT title, id FROM role;', (err, results) => {
                if (err){
                    console.log(err);
                    return;
                }
                if (results.length){
                    for(let x = 0; x < results.length; x++){
                        departmentArray.push([results[x].title, results[x].id]);
                    }
                }
            });
            inquirer
            .createPromptModule([
                {
                    type: 'input',
                    message: 'What is the first name of the new employee?',
                    name: 'first_name',
                },
                {
                    type: 'input',
                    message: 'What is the last name of the new employee?',
                    name: 'last_name',
                },
                {
                    type: 'list',
                    message: 'What department does the new employee belong to?',
                    name: 'employeeDepartment',
                    choices: departmentArray,
                },
                // Stopped here
            ])   
    }
  });
