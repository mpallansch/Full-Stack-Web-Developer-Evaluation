const http = require('http');
const sqlite3 = require('sqlite3');

const hostname = '127.0.0.1';
const port = 3000;

const db = new sqlite3.Database(':memory:');

db.run(
  `CREATE TABLE Users (
    id INTEGER PRIMARY KEY,
    firstname TEXT,
    lastname TEXT,
    status TEXT
  )`,

  (err) => {
    if(err){
      console.log('Error creating Users table', err);
    } else {

      db.run(
        `INSERT INTO Users (id, firstname, lastname, status)
          VALUES
            (1, 'John', 'Doe', 'Active'),
            (2, 'Jane', 'Doe', 'Active'),
            (3, 'John', 'Smith', 'Inactive')`, (err) => {
              if(err){
                console.log('Error populating Users table');
              }
            });
    }
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  /* Challenge 1: Uncomment the code below and write
      a) A SQL query to get the rows from the table in which the 'status' property is equal to 'Active'
      b) Code to return the data to the client in a structured format

      Help with SQLite: https://www.sqlitetutorial.net/
  */

  /*db.all(
    '' //a) Write SQL query here
    , (err, rows) => {
    if(err){
      console.log(err);
      res.statusCode = 500;
      res.end('Error requesting data');
    }

    let structuredData = rows; //b) format rows
      
    res.end( structuredData );
  });*/

  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
