var schedule = require("node-schedule");

const createNewPrice = (Bike) =>{
    const updatePrice = { price: 0 };
    let newPrice;
        Bike.findOne(filter, function (err, bike) {
          if (err) return console.log(err);
          newPrice = Number(bike.price) * 2;
          updatePrice.price = newPrice;
          console.log(updatePrice.price);
          Bike.findOneAndUpdate(filter, updatePrice, { new: true }, function (
            err,
            bike
          ) {
            if (err) return console.log(err);
          });
        });
}
export {createNewPrice};