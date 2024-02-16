const express = require("express");

const postRoutes = require("./routes/post");
const db = require("./data/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(postRoutes);

db.connectToDb()
  .then((result) => {
    app.listen(3000, () => console.log("Server starts."));
  })
  .catch((err) => {
    console.log(err);
  });
