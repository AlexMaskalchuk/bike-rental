import React from 'react';
import { printBike } from './printBike';
import { count } from '../functions/considerAvailable';
import { render } from '@testing-library/react';

class AvailableBikes extends React.Component {

  remove = async (id) => {
    let response = await fetch(`http://localhost:9000/${id}`, {
      method: 'DELETE',
    });
    this.props.getBikes();
  };

  checkBikes = (bikes) => {
    const bike = bikes.find((item) => {
      return !item.isRented;
    });
    return bike;
  };

  render() {
    const { bikes, addOrCancelRent } = this.props;
    return (
      <div id='ava' className='list-group'>
           {this.checkBikes(bikes) ? (
        <h4> 🚲 Available Bicycles ({count(bikes)})</h4> ):(
            <div></div>
        )}   
        {bikes.map(({ _id, name, type, price, isRented, date }) => {
          if (!isRented) {
            return printBike(
              _id,
              name,
              type,
              price,
              isRented,
              date,
              addOrCancelRent,
              this.remove
            );
          }
        })}
      </div>
    );
  }
}

export default AvailableBikes;
