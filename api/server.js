const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 9000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("./routes/note_routes")(app, {});

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://Alex:Alex@cluster0.usjxd.mongodb.net/bike-rental",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    app.listen(port, () => {
      console.log("Server has been started: " + port);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
