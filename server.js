
// Pull in the necessary imports
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');


const PORT = process.env.PORT || 3001;

const app = express();
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

// Express middleware; not sure if I need it yet
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const viewDep = 'View all departments';
const viewRol = 'View all roles';
const viewEmp = 'View all employees';
const addDep = 'Add a department';
const addEmp = 'Add an employee';
const upEmp = 'Update an employee';

/* Extra security from https://github.com/mysqljs/mysql */



inquirer
    .createPromptModule([
        {
            type: 'list',
            message: 'What would you like to do?',
            name:'menuChoice',
            choices: [viewDep, viewRol, viewEmp, addDep, addEmp, upEmp],
        },
    ])
    .then((response) =>{
        var userChoice = response.menuChoice;
        
        // ...
      
          switch(response.menuChoice){
              case viewDep: 
              var sql = 'SELECT * FROM department';
              db.query(sql, function (error, results, fields){
                  if (error) throw error;
              })
          };
    }
        
    );