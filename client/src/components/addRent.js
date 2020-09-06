import React from "react";

const addRent = (add, nameChange, typeChange, priceChange) => {
  return (
    <form action='http://localhost:9000/notes' method='post'>
    <div className="row list-group-item add">
      <div className="label-input">
        <label htmlFor="bike-name">Bike name</label>
        <input
          id="bike-name"
          className="form-control"
          onChange={nameChange}
        ></input>
      </div>
      <div className="label-input">
        <label htmlFor="bike-type">Bike type</label>
        <div className="dropdown">
          <select id="bike-type" className="form-control" onChange={typeChange}>
            <option>Road</option>
            <option>Custom</option>
            <option>Mountain</option>
          </select>
        </div>
      </div>
      <div className="label-input">
        <label htmlFor="price">Price</label>
        <input type="number"
          id="price"
          className="form-control"
          onChange={priceChange}
        ></input>
      </div>
      <div className='submit-button'>
        <button className="btn btn-success" type="submit" onClick={() => add()}>
          Submit rent
        </button>
      </div>
    </div>
    </form>
  );
};

export { addRent };
