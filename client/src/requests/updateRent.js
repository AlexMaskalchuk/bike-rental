const updateRent = async (id, isRented, date) => {
    const response = await fetch(`http://localhost:9000/${id}`, {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        isRented: isRented,
        date: date,
      }),
    });
    return await response.json();
  };

  export { updateRent };