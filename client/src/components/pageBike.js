import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { timeRent } from "../functions/considerAvailable.js";

class Bike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bike: "",
    };
  }

  async componentDidMount() {
    let response = await fetch(
      `http://localhost:9000/${this.props.match.params.id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    let bike = await response.json();
    console.log(bike);
    this.setState({ bike: bike });
  }


  render() {
    const { name, type, price, date } = this.state.bike;
    return (
      <div className="container-bike">
        <div className="row list-group-item">
          <div className="bike-p">
            {" "}
            <p>
              {name} / {type} / {price} Rent time {timeRent(date)} hours
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
