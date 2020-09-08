import React from 'react';
import AddRent from './AddRent';
import RentedBikes from './RentedBikes';
import AvailableBikes from './AvailableBikes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bikes: [],
    };
  }

  callApi = async () => {
    let response = await fetch('http://localhost:9000', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    let bikes = await response.json();
    console.log(bikes);
    this.setState({ bikes: bikes });
  };

  componentDidMount() {
    this.callApi();
  }

  addOrCancelRent = async (id, isRented) => {
    const bike = this.state.bikes.find((item) => {
      if (item._id === id) {
        return item;
      }
    });
    const date = new Date();
    let response = await fetch(`http://localhost:9000/${bike._id}`, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        name: bike.name,
        type: bike.type,
        price: bike.price,
        isRented: bike.isRented,
        date: date,
      }),
    });
    this.callApi();
  };

  render() {
    const { bikes } = this.state;
    return (
      <div className='main'>
        <br />
        <div className='form'>
          <h3>Awesome Bike Rental</h3>
          <br />
          <h4> 🤑 Create new rent</h4>
          <AddRent callApi={this.callApi} />
        </div>
        <br />
        <div className='lists'>
          <RentedBikes bikes={bikes} addOrCancelRent={this.addOrCancelRent} />
          <br />
          <AvailableBikes
            bikes={bikes}
            remove={this.remove}
            addOrCancelRent={this.addOrCancelRent}
            callApi={this.callApi}
          />
          <br />
        </div>
      </div>
    );
  }
}

export default App;
