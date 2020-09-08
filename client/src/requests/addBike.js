const addBike = async (name, type, price) => {
  const response = await fetch(`http://localhost:9000`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, type, price, isRented: false, date: null, discount: false }),
  });
  return await response.json();
};

export { addBike };
