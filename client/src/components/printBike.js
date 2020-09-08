import React from "react";
import { Link } from "react-router-dom";
import { timeRent } from "../functions/considerAvailable";

const printBike = (
  _id,
  name,
  type,
  price,
  isRented,
  date,
  addOrCancelRent,
  remove
) => {
  return (
    <div key={_id} id={_id} className="row list-group-item">
      <div className='bike-p'>
      <Link to={`/Bike/${_id}`}>
          <p className='text-justify'> 
            {name} / {type} / {price}{" "}
            {date ? `/ Rent time  ${timeRent(date)} hours` : ``}
          </p>
      </Link>
      </div>
      {!isRented ? (
        <div className="block-button">
          <div className='button'>
          <button
            className="btn btn-primary"
            onClick={() => addOrCancelRent(_id, !isRented)}
          >
            Rent
          </button>
          </div>
          <div className='button'>
          <button className="btn btn-danger" onClick={() => remove(_id)}>
            Delete
          </button>
          </div>
        </div>
      ) : (
        <div className='button'>
        <button
          className="btn btn-danger"
          onClick={() => addOrCancelRent(_id, !isRented)}
        >
          Cancel rent
        </button>
        </div>
      )}
    </div>
  );
};

export { printBike };
