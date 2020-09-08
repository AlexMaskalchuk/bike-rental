import React from "react";
import AddRent from "./AddRent";
import RentedBikes from "./RentedBikes";
import AvailableBikes from "./AvailableBikes";
import { fetchBikes } from '../requests/fetchBikes';
import { updateRent } from '../requests/updateRent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bikes: [],
    };
  }

  getBikes = async () => {
    const bikes = await fetchBikes();
    this.setState({ bikes });
  }

  async componentDidMount() {
    this.getBikes();
  }

  addOrCancelRent = async (id) => {
    const { isRented } = this.state.bikes.find(({_id}) => _id === id);
    const date = new Date();
    const bikes = await updateRent(id, isRented, date);
    this.setState({ bikes });
  };

  render() {
    const { bikes } = this.state;
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
          <RentedBikes bikes={bikes} addOrCancelRent={this.addOrCancelRent} />
          <br />
          <AvailableBikes
            bikes={bikes}
            remove={this.remove}
            addOrCancelRent={this.addOrCancelRent}
            getBikes={this.getBikes}
          />
          <br />
        </div>
      </div>
    );
  }
}

export default App;
