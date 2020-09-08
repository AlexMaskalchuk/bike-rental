const mongoose = require('mongoose');
const schedule = require('node-schedule');
const bikes =[];
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
const Bike = mongoose.model('Bike', bikeScheme);

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

const createNewPrice = (Bike, filter, checkRented) => {
  const updatePrice = { price: 0, discount: false };
  let newPrice;
  Bike.findOne(filter, function (err, bike) {
    if (err) return console.log(err);
    if (checkRented) {
      newPrice = Number(bike.price) / 2;
      updatePrice.discount = true;
      console.log(newPrice)
    } else {
      if (bike.discount) {
        newPrice = Number(bike.price) * 2;
      }
    }
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

const validateForm = (name, type, price) => {
    if(name&&type&&price){
      return true;
    }else{
      return false;
    }
}


module.exports = function (app, db) {
  app.post('/', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    let bike = {};
    const {name, type, price} = req.body;
    if(validateForm(name, type, price)){
      bike = new Bike(req.body);
      bike.save(function (err) {
        if (err) return console.log(err);
        res.send(bike);
      });
    }else{
      res.send(bike);
    }
    
   
  });

  app.get('/:id', (req, res) => {
    const id = req.params.id;
    Bike.findOne({ _id: id }, function (err, bike) {
      if (err) return console.log(err);

      res.send(bike);
    });
  });

  app.get('/', (req, res) => {
    Bike.find({}, function (err, bikes) {
      if (err) return console.log(err);
      res.send(bikes);
    });
  });

  app.delete('/:id', (req, res) => {
    const id = req.params.id;
    Bike.findByIdAndDelete(id, function (err, bike) {
      if (err) return console.log(err);
      res.send(bike);
    });
  });

  app.put('/:id', (req, res) => {
    const filter = { _id: req.params.id };
    let date = null;
    if (!req.body.isRented) {
      date = new Date();
      let dateSale = new Date();
      console.log(dateSale);
      dateSale.setTime(dateSale.getTime() + 0.1 * 60 * 1000);
      console.log(dateSale);
      const j = schedule.scheduleJob(dateSale, function () {
        console.log('Ok');
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
