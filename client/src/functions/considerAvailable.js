const getAvailableTotal = (bikes) => {
  let total = 0;
  bikes.forEach(({ price }) => (total += price));
  return total;
};

const timeRent = (date) => {
  if (!date) {
    return "";
  }
  const dateStart = new Date(date);
  const dateNow = new Date();
  const duration = dateNow - dateStart;
  return parseInt(duration / (1000 * 60 * 60));
};
export { getAvailableTotal, timeRent };
