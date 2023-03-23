"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set("view engine", "ejs");
let items = [];
let workItems = [];

app.get("/", function (req, res) {
  let day = date.getDate();

  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect("/work");
  }
  else {
    items.push(item); 
    res.redirect("/");
  }
});

app.get('/work',(req,res) => {
  res.render('list',{listTitle : 'Work List', newListItems : workItems})
});

app.listen(2000, function () {
  console.log("Server Started on port 2000");
});
