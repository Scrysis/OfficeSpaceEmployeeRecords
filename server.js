
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

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());