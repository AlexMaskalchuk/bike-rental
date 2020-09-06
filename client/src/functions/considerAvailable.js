const count = (bikes) => {
  let tmpBikes = bikes.filter((item) => {
    return item.isRented !== true;
  });
  return tmpBikes.length;
};

const total = (bikes) => {
  let total = 0;
  bikes.map((item) => {
    if (item.isRented) {
      total += item.price;
    }
  });
  return total;
};

const timeRent = (date) => {
  const dateStart = new Date(date);
  const dateNow = new Date();
  const duration = dateNow - dateStart;
  return parseInt((duration / (1000 * 60)));
};
export { count, total, timeRent };
