import React from "react";
import { Link } from "react-router-dom";
import { timeRent } from "../functions/considerAvailable.js";
import { fetchBike } from "../requests/fetchBike";

class Bike extends React.Component {
  state = {
    bike: "",
  };

  async componentDidMount() {
    const bike = await fetchBike(this.props.match.params.id);
    this.setState({ bike });
  }

  render() {
    const { name, type, price, date } = this.state.bike;
    return (
      <div className="container-bike">
        <div className="row list-group-item">
          <div className="bike-p">
            <p>
              {name} / {type} / {price}
              {date && `/ Rent time ${timeRent(date)} hours`}
            </p>
          </div>

          <div className="cell">
            <Link to={"/"}>
              <button className="btn btn-secondary custom-button">Back</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Bike;
