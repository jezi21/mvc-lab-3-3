const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.static('public'));

views={};
// add views to the views object iterate over views folder
fs.readdirSync('./views').forEach(file => {
    views[file.split('.')[0]] = fs.readFileSync(`./views/${file}`, 'utf8');
}
);


app.use(bodyParser.urlencoded({ extended: true }));

const students = [];

app.use((req, res, next) => {
    console.log(`Request ${req.method} on path ${req.url} ${new Date()}`);
    next();
});


function putValues(text, values) {
    let result = text;
    for (const key in values) {
        result = result.replace(new RegExp(`{${key}}`, 'g'), values[key]);
    }
    return result;
    
}

function generate(body,title){
    return putValues(views.layout, {body,title});
}



app.get('/home', (req, res) => {
    const title = 'HOME';
    const body = putValues(views.home, {title});
    res.send(generate(body,title));
});

app.post('/student', (req, res) => {
    // Pobranie danych z formularza
    const { firstName, lastName, major } = req.body;
    const title = 'STUDENT';
    students.push({firstName,lastName,major});
    const body = putValues(views.student, {firstName, lastName, major});
    res.send(generate(body,title));

    
});


app.get('/add-student', (req, res) => {
    const title = 'ADD-STUDENT';
    const body = views.addStudent;
    
    res.send(generate(body,title));
  
});


app.get('/students', (req, res) => {
    // Tworzenie listy HTML na podstawie danych z tablicy students
    const studentList = students.map(student => `<p>${student.firstName} ${student.lastName} - ${student.major}</p>`).join('');
    
    const title = 'STUDENTS';
    const body = putValues(views.students, {studentList});
    res.send(generate(body,title));
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
