import React from "react";
import AddRent from "./addRent";
import { fetchBikes } from "../requests/fetchBikes";
import { updateRent } from "../requests/updateRent";
import { BicyclesTable } from "./bicycleStable";
import { getAvailableTotal } from '../functions/considerAvailable';

class App extends React.Component {
  state = {
    bikes: [],
  };

  getBikes = async () => {
    const bikes = await fetchBikes();
    this.setState({ bikes });
  };

  async componentDidMount() {
    this.getBikes();
  }

  remove = async (id) => {
    await fetch(`http://localhost:9000/${id}`, {
      method: "DELETE",
    });
    this.getBikes();
  };

  addOrCancelRent = async (id) => {
    const { isRented } = this.state.bikes.find(({ _id }) => _id === id);
    const date = new Date();
    const bikes = await updateRent(id, isRented, date);
    this.setState({ bikes });
  };

  render() {
    const { bikes } = this.state;
    const bikesRented = bikes.filter(({ isRented }) => isRented);
    console.log(bikes);
    const bikesAvailable = bikes.filter(({ isRented }) => !isRented);
    return (
      <div className="main">
        <br />
        <div className="form">
          <h3>Awesome Bike Rental</h3>
          <br />
          <h4> 🤑 Create new rent</h4>
          <AddRent getBikes={this.getBikes} />
        </div>
        <br />
        <div className="lists">
        
          <BicyclesTable
            header={<h4> 🤩 Rented Bicycles (${getAvailableTotal(bikesAvailable)})</h4>}
            bikes={bikesRented}
            addOrCancelRent={this.addOrCancelRent}
          />
          <br />
          <BicyclesTable
            header={<h4> 🚲 Available Bicycles ({bikesAvailable.length})</h4>}
            bikes={bikesAvailable}
            addOrCancelRent={this.addOrCancelRent}
            remove={this.remove}
          />
        </div>
      </div>
    );
  }
}

export default App;
