const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));

const students = [];

app.use((req, res, next) => {
    console.log(`Request ${req.method} on path ${req.url} ${new Date()}`);
    next();
});

app.get('/home', (req, res) => {
  res.send(`
      <html>
          <head>
              <title>HOME</title>
          </head>
          <body>
              <p>HOME</p>
          </body>
      </html>
  `);
});

app.post('/student', (req, res) => {
    // Pobranie danych z formularza
    const { firstName, lastName, major } = req.body;

    students.push({firstName,lastName,major});
   

    // Wyświetlenie powitania
    res.send(`
        <html>
            <head>
                <title>STUDENT</title>
            </head>
            <body>
                <p>Hello, ${firstName} ${lastName}on ${major} studies!</p>
            </body>
        </html>
    `);
});


app.get('/add-student', (req, res) => {
  res.send(`
      <html>
          <head>
              <title>ADD-STUDENT</title>
          </head>
          <body>
              <form action="/student" method="post">
                  <label for="firstName">First Name:</label>
                  <input type="text" id="firstName" name="firstName"><br><br>
                  <label for="lastName">Last Name:</label>
                  <input type="text" id="lastName" name="lastName"><br><br>
                  <label for="major">Major:</label>
                  <input type="text" id="major" name="major"><br><br>
                  <input type="submit" value="Submit">
              </form>
          </body>
      </html>
  `);
});


app.get('/students', (req, res) => {
    // Tworzenie listy HTML na podstawie danych z tablicy students
    const studentList = students.map(student => `<p>${student.firstName} ${student.lastName} - ${student.major}</p>`).join('');
    
    // Wyświetlenie listy studentów
    res.send(`
        <html>
            <head>
                <title>STUDENTS</title>
            </head>
            <body>
                <h1>List of Students</h1>
                <ul>${studentList}</ul>
            </body>
        </html>
    `);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
