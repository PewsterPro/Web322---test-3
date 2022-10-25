//Student Name: Hugh Kim
//Student Number: 141050211
//Email: hkim384@myseneca.ca
//Cyclic URL: 

const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const dataPrep = require("./data_prep");
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
});

app.get("/CPA", function(req,res){
    dataPrep.cpa()
    .then((data) => {res.json(data);}).catch((err) => {
        console.log(err);res.json(err);
    })
});

app.get("/highGPA", function(req,res){
    dataPrep.highGPA()
    .then((data) => {res.json(data);}).catch((err) => {
        console.log(err);res.json(err);
    })
    
});

app.get("/addStudent", (req, res) => {
    res.sendFile(__dirname + "/test3_views/addStudent.html");
});

app.post("/addStudent", function(req,res){
    dataPrep.addStudent(req.body).then(() => {res.redirect("/allStudents");});
});

app.get("/allStudents", function(req,res){
    dataPrep.allStudent()
    .then((data) => {res.json(data);}).catch((err) => {
        console.log(err);res.json(err);
    })
});

app.get("/student/:studId", function (req, res) {
    dataPrep.getStudentById(req.params)
    .then((data) => {res.json(data);}).catch((err) => {
        console.log(err);res.json(err);
    })
});

app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname,"/views/error404.html"));
})

dataPrep.prep()
    .then(() => {
        app.listen(8080, onHttpStart);
    }).catch((err) => {
        console.log(err);
    });
