
const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is your user name?',
      name: 'username',
    },
    {
      type: 'password',
      message: 'What is your password?',
      name: 'password',
    },
    {
      type: 'password',
      message: 'Re-enter password to confirm:',
      name: 'confirm',
    },
  ])
  .then((response) =>
    response.confirm === response.password
      ? console.log('Success!')
      : console.log('You forgot your password already?!')
  );




  //-----------------------------------------------------------

  const express = require('express');
  const termData = require('./terms.json');
  
  const PORT = 3001;
  
  const app = express();
  
  // GET route to get all of the terms
  app.get('/api/terms', (req, res) => res.json(termData));
  
  // GET route that returns any specific term
  app.get('/api/terms/:term', (req, res) => {
    // Coerce the specific search term to lowercase
    const requestedTerm = req.params.term.toLowerCase();
  
    // Iterate through the terms name to check if it matches `req.params.term`
    for (let i = 0; i < termData.length; i++) {
      if (requestedTerm === termData[i].term.toLowerCase()) {
        return res.json(termData[i]);
      }
    }
  
    // Return a message if the term doesn't exist in our DB
    return res.json('No match found');
  });
  
  // Fallback route for when a user attempts to visit routes that don't exist
  app.get('*', (req, res) =>
    res.send(
      `Make a GET request using Insomnia to <a href="http://localhost:${PORT}/api/terms">http://localhost:${PORT}/api/terms</a>`
    )
  );
  
  // Listen for connections
  app.listen(PORT, () =>
    console.info(`Example app listening at http://localhost:${PORT}`)
  );

  // --_____________________________________________________

  const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'courses_db'
  },
  console.log(`Connected to the courses_db database.`)
);

// Hardcoded query: DELETE FROM course_names WHERE id = 3;

db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Query database
db.query('SELECT * FROM course_names', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
