const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 9000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("./routes/bikeRoutes")(app, {});

async function start() {
  try {
    await mongoose.connect(" mongodb://127.0.0.1:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(port, () => {
      console.log("Server has been started: " + port);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
