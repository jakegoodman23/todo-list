const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

const items = ["Grocery Shop", "Homework", "Prepare for work"];
const workItems = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { listTitle: day, newItems: items });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;
  console.log("list: " + req.body.list);
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
  res.redirect("/");
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", newItems: workItems });
});

app.post("/work", function (req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function () {
  console.log("Server has started on port 3000");
});
