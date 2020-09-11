const mongoose = require("mongoose");
const schedule = require("node-schedule");
const Schema = mongoose.Schema;
const bikeScheme = new Schema(
  {
    name: String,
    type: String,
    price: Number,
    isRented: Boolean,
    date: Date,
    discount: Boolean,
  },
  { versionKey: false }
);
const Bike = mongoose.model("Bike", bikeScheme);

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

const createNewPrice = (Bike, filter, checkRented, discount) => {
  const updatePrice = { price: 0, discount: false };
  let newPrice;
  Bike.findOne(filter, function (err, bike) {
    if (checkRented) {
      if(!bike.discount){
        newPrice = Number(bike.price) / 2;
        updatePrice.discount = true;
      }
    } else {
      bike.discount && (newPrice = Number(bike.price) * 2);
    }
    if (newPrice) {
      updatePrice.price = newPrice;
      Bike.findOneAndUpdate(filter, updatePrice, { new: true }, function (
        err,
        bike
      ) {});
    }
  });
};

const validateForm = (name, type, price) => {
  if (name && type && price) {
    return true;
  } else {
    return false;
  }
};

module.exports = function (app) {
  app.post("/", (req, res) => {
    const { name, type, price } = req.body;
    if (validateForm(name, type, price)) {
      bike = new Bike(req.body);
      bike.save(function () {
        res.send(bike);
      });
    } else {
      res.send(bike);
    }
  });

  app.get("/:id", (req, res) => {
    Bike.findOne({ _id: req.params.id }, function (err, bike) {
      res.send(bike);
    });
  });

  app.get("/", (req, res) => {
    Bike.find({}, function (err, bikes) {
      res.send(bikes);
    });
  });

  app.delete("/:id", (req, res) => {
    Bike.findByIdAndDelete(req.params.id, function (err) {
      Bike.find({}, function (err, bikes) {
        res.send(bikes);
      });
    });
  });

  app.put("/:id", (req, res) => {
    let date = null;
    if (!req.body.isRented) {
      date = new Date();
      let dateSale = new Date();
      dateSale.setTime(dateSale.getTime() + 20 * 60 * 60 * 1000);
      schedule.scheduleJob(dateSale, function () {
        createNewPrice(Bike, { _id: req.params.id }, true);
      });
    } else {
      createNewPrice(Bike, { _id: req.params.id }, false);
    }
    Bike.findOneAndUpdate(
      { _id: req.params.id },
      { isRented: !req.body.isRented, date: date },
      { new: true },
      function () {
        Bike.find({}, function (err, bikes) {
          res.send(bikes);
        });
      }
    );
  });
};
