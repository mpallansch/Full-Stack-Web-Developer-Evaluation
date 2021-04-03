const http = require('http');
const sqlite3 = require('sqlite3');

const hostname = '127.0.0.1';
const port = 3001;

const db = new sqlite3.Database(':memory:');

db.run(
  `CREATE TABLE Users (
    id INTEGER PRIMARY KEY,
    firstname TEXT,
    lastname TEXT,
    status TEXT,
    role TEXT
  )`,

  (err) => {
    if(err){
      console.log('Error creating Users table', err);
    } else {

      db.run(
        `INSERT INTO Users (id, firstname, lastname, status, role)
          VALUES
            (1, 'John', 'Doe', 'Active', 'Admin'),
            (2, 'Jane', 'Doe', 'Active', 'User'),
            (3, 'John', 'Smith', 'Inactive', 'User'),
            (4, 'Jane', 'Smith', 'Active', 'Admin')`, (err) => {
              if(err){
                console.log('Error populating Users table', err);
              }
            });
    }
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  /* Challenge 1:
      a) Uncomment the code block below, and comment out the "Hello World" response
      b) Write a SQL query to get all data from the rows in the table in which the 'status' property is equal to 'Active'
      c) Structure the data into a string in order to return to the client

      Help with SQLite: https://www.sqlitetutorial.net/
  */

  //a) Uncomment this code block
    db.all(
    'SELECT * FROM Users WHERE status="Active"' //b) Write SQL query here
    , (err, rows) => {
    if(err){
      console.log(err);
      res.statusCode = 500;
      res.end('Error requesting data');
    }

    let structuredData = JSON.stringify(rows); //c) Format 'rows' variable into a string to return to the client
      
    res.end( structuredData );
  });

  //a) Comment the line below
  //res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
