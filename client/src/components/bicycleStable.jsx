import React from "react";
import { count } from "../functions/considerAvailable";
import { PrintBike } from './printBike';

const BicyclesTable = (props) =>{
    const { header, bikes, addOrCancelRent, remove } = props;
    return (
      <div id="ava" className="list-group">
      {header}
        {bikes.map(
          (bike) =>
            (
              <PrintBike
                bike={bike}
                addOrCancelRent={addOrCancelRent}
                remove={remove}
              />
            )
        )}
      </div>
    );
  }
  export {BicyclesTable};