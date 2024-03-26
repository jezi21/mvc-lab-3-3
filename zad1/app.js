const express = require('express');
const app = express();
const port = 3000;


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


app.get('/student', (req, res) => {
  res.send(`
      <html>
          <head>
              <title>STUDENT</title>
          </head>
          <body>
              <p>STUDENT</p>
          </body>
      </html>
  `);
});


app.post('/add-student', (req, res) => {
  
  res.send(`
      <html>
          <head>
              <title>ADD-STUDENT</title>
          </head>
          <body>
              <p>ADD-STUDENT</p>
          </body>
      </html>
  `);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});