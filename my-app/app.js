const express = require("express");
const methodOverride = require("method-override");
const app = express();
const path = require("path");
const port = 3000;
let students = require("./data/dummy_students");

// middlewares ====
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//serving static files==========
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

//configuring ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// route definitions
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/students", (req, res) => {
  res.render("index", { students });
});
app.get("/students/new", (req, res) => {
  res.render("new");
});
app.post("/students", (req, res) => {
  const data = req.body;
  const new_obj = { ...data, id: Math.random() * 20 };
  students.push(new_obj);
  res.redirect("/students");
});

app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  const found_student = students.find((data) => data.id == id);
  res.render("show", { found_student });
});

app.get("/students/:id/edit", (req, res) => {
  const { id } = req.params;
  const found_student = students.find((data) => data.id == id);
  res.render("edit", { found_student });
});

app.patch("/students/:id", (req, res) => {
  const { id } = req.params;
  const new_info = { ...req.body, id };
  const foundIndex = students.findIndex((data) => data.id == id);
  if (foundIndex !== -1) {
    students[foundIndex] = { ...students[foundIndex], ...new_info };
    res.send("User successfully updated");
  } else {
    res.status(404).send("Student not found");
  }
});

app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  const studentToDelete = students.find((data) => data.id == id);

  if (!studentToDelete) {
    res.status(404).send("Student not found");
  }
  students = students.filter((data) => {
    return data.id != id;
  });
  res.redirect("/students");
});

app.get("*", (req, res) => {
  res.redirect("error");
});

//set up server
app.listen(port, () => {
  console.log("STARTING UP SERVER================================");
  console.log(`listening to incoming request on our server ${port}`);
});
