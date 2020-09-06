import React from "react";

const printDelete = (isRented) => {
  if (!isRented) {
    <button onClick={() => cancelRent(_id, !isRented)}>Delete</button>;
  }
};

export { printDelete };
