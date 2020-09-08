import React from "react";
import { printBike } from "./printBike";
import { total } from "../functions/considerAvailable";

class RentedBikes extends React.Component {


  checkBikes = (bikes) => {
    const bike = bikes.find((item) => {
        return item.isRented === true;
      });
    return bike;
  };

  render() {
    const { bikes, addOrCancelRent } = this.props;
    return (
      <div id="rent" className="list-group">
        {this.checkBikes(bikes) ? (
        <h4> 🤩  Rented Bicycles ({`$` + total(bikes)})</h4> ):(
            <div></div>
        )}   
        {bikes.map(({ _id, name, type, price, isRented, date }) => {
          if (isRented) {
            return printBike(
              _id,
              name,
              type,
              price,
              isRented,
              date,
              addOrCancelRent
            );
          }
        })}
           
           
      </div>
    );
  }
}
export default RentedBikes;