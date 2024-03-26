const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.static("public"));

views = {};

fs.readdirSync("./views").forEach((file) => {
  views[file.split(".")[0]] = fs.readFileSync(`./views/${file}`, "utf8");
});

app.use(bodyParser.urlencoded({ extended: true }));

let students = [];
const courses = [];

app.use((req, res, next) => {
  console.log(`Request ${req.method} on path ${req.url} ${new Date()}`);
  next();
});

function putValues(text, values) {
  let result = text;
  for (const key in values) {
    result = result.replace(new RegExp(`{${key}}`, "g"), values[key]);
  }
  return result;
}

function generate(body, title) {
  return putValues(views.layout, { body, title });
}

app.get("/home", (req, res) => {
  const title = "HOME";
  const body = putValues(views.home, { title });
  res.send(generate(body, title));
});

app.post("/student", (req, res) => {
  const { firstName, lastName, major } = req.body;

  const id = new Date().getTime();
  students.push({ firstName, lastName, major, id });

  const title = "STUDENT";
  const body = putValues(views.student, { firstName, lastName, major });
  res.send(generate(body, title));
});

app.get("/add-student", (req, res) => {
  const title = "ADD-STUDENT";
  const body = views.addStudent;

  res.send(generate(body, title));
});

app.get("/students", (req, res) => {
  const studentList = students
    .map(
      (
        student
      ) => `<p>${student.firstName} ${student.lastName} - ${student.major}</p>
    <button id="student${student.id}">Usuń Studenta</button>
    
    
    </form>


    `
    )
    .join("");

  const title = "STUDENTS";
  const body = putValues(views.students, { studentList });
  res.send(generate(body, title));
});

app.delete("/student/:studentId", (req, res) => {
  let studentId = parseInt(req.params.studentId);

  students = students.filter((student) => student.id !== studentId);
    // redirect to get students
  res.redirect("/students");
});

app.get("/course/add", (req, res) => {
  const title = "ADD COURSE";
  const body = views.addCourse;
  res.send(generate(body, title));
});

app.post("/course/add", (req, res) => {
  const { name } = req.body;
  const id = courses.length + 1;
  courses.push({ name, id });

  res.redirect("/courses");
});

app.get("/courses", (req, res) => {
  const title = "COURSES";
  const courseList = courses.map((course) => `<p>${course.name}</p>`).join("");
  const body = putValues(views.courses, { courseList });

  res.send(generate(body, title));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
