const bikes = [];
const crons = [];
var moment = require("moment");
const mongoose = require("mongoose");
var schedule = require("node-schedule");

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

const createNewPrice = (Bike, filter, checkRented) => {
  const updatePrice = { price: 0, discount: false };
  let newPrice;
  Bike.findOne(filter, function (err, bike) {
    if (err) return console.log(err);
    updatePrice.discount = true;
    //console.log(updatePrice);
    if (checkRented) {
      newPrice = Number(bike.price) / 2;
    } else {
      if (updatePrice.discount) {
        newPrice = Number(bike.price) * 2;
      }
    }
    console.log(newPrice)
    if (newPrice) {
      console.log(updatePrice);
      updatePrice.price = newPrice;
      
      Bike.findOneAndUpdate(filter, updatePrice, { new: true }, function (
        err,
        bike
      ) {
        if (err) return console.log(err);
      });
    }
  });
};
const Schema = mongoose.Schema;
const bikeScheme = new Schema(
  { name: String, type: String, price: Number, isRented: Boolean, date: Date, discount: Boolean },
  { versionKey: false }
);
const Bike = mongoose.model("Bike", bikeScheme);

module.exports = function (app, db) {
  app.post("/notes", (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const bike = new Bike(req.body);
    console.log(req.body.discount);
    bike.save(function (err) {
      if (err) return console.log(err);
      res.send(bikes);
    });
  });

  app.get("/notes/:id", (req, res) => {
    const id = req.params.id;
    Bike.findOne({ _id: id }, function (err, bike) {
      if (err) return console.log(err);

      res.send(bike);
    });
  });

  app.get("/notes", (req, res) => {
    Bike.find({}, function (err, bikes) {
      if (err) return console.log(err);
      res.send(bikes);
    });
  });

  app.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    Bike.findByIdAndDelete(id, function (err, bike) {
      if (err) return console.log(err);
      res.send(bike);
    });
  });

  app.put("/notes/:id", (req, res) => {
    const filter = { _id: req.params.id };
    let date = null;
    if (!req.body.isRented) {
      date = new Date();
      let dateSale = new Date();
      dateSale.setTime(dateSale.getTime() + 0.1 * 60 * 1000);
      const updatePrice = { price: 0 };
      const j = schedule.scheduleJob(dateSale, function () {
        createNewPrice(Bike, filter, true);
      });
    } else {
      createNewPrice(Bike, filter, false);
    }
    const update = { isRented: !req.body.isRented, date: date };
    console.log(date);
    Bike.findOneAndUpdate(filter, update, { new: true }, function (err, bike) {
      if (err) return console.log(err);
      Bike.find({}, function (err, bikes) {
        if (err) return console.log(err);
        res.send(bikes);
      });
    });
  });
};
