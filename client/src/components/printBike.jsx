import React from "react";
import { Link } from "react-router-dom";
import { timeRent } from "../functions/considerAvailable";

const PrintBike = ({
  bike: { _id, name, type, price, isRented, date },
  addOrCancelRent,
  remove,
}) => {
  const classNameButton = ""
  return (
    <div key={_id} id={_id} className="row list-group-item">
      <div className="bike-p">
        <Link to={`/Bike/${_id}`}>
          <p className="text-justify">
            {name} / {type} / {price}{" "}
            {date && `/ Rent time  ${timeRent(date)} hours`}
          </p>
        </Link>
      </div>
      <div className="block-button">
        <div className="button">
          <button
            className={!isRented ? "btn btn-primary" : "btn btn-danger"}
            onClick={() => addOrCancelRent(_id, !isRented)}
          >
            {isRented ? "Cancel rent" : "Rent"}
          </button>
        </div>
        {!isRented && (
          <div className="button">
            <button className="btn btn-danger" onClick={() => remove(_id)}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { PrintBike };
