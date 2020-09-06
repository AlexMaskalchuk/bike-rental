import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { timeRent } from "../functions/considerAvailable.js";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bike: "",
    };
  }

  async componentDidMount() {
    let response = await fetch(
      `http://localhost:9000/notes/${this.props.match.params.id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    let bike = await response.json();
    this.setState({ bike: bike });
  }
  timeRent = (date) => {
    const dateStart = new Date(date);
    const dateNow = new Date();
    const duration = dateNow - dateStart;
    return parseInt((duration / (1000 * 60)) % 60);
  };

  render() {
    const { name, type, price, date } = this.state.bike;
    return (
      <div className="container-bike">
        <div className="row list-group-item">
          <div className="bike-p">
            {" "}
            <p>
              {name} / {type} / {price} Rent time {this.timeRent(date)} hours
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
export default Note;
