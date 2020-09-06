
import React from "react";

import { addRent } from "./addRent";
import RentedBikes  from "./rentedBikes";
import  AvailableBikes from "./availableBikes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bikes: [],
      bike: {},
      name: '',
      type: '',
      price: 0,
      countAvailable: 0,
      isRented: false,
    };
  }
  async callApi() {
    let response = await fetch("http://localhost:9000/notes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    let bikes = await response.json();
    console.log(bikes);
    this.setState({ bikes: bikes });
  }

  componentDidMount() {
    this.callApi();
  }

  add = async () => {
    const { name, type, price, isRented } = this.state;
    const date = null;
    const discount = false;
    console.log(typeof name);
    let response = await fetch(`http://localhost:9000/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, type, price, isRented, date, discount }),
    });
    const res = await response.json();
    console.log(res);
    this.callApi();
  };

  cancelRent = async (id, isRented) => {
    const bike = this.state.bikes.find((item) => {
      if (item._id === id) {
        return item;
      }
    });
    console.log("asd" + bike._id);
    const date = new Date();
    let response = await fetch(`http://localhost:9000/notes/${bike._id}`, {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json" }),
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

  remove = async (id) => {
    let response = await fetch(`http://localhost:9000/notes/${id}`, {
      method: "DELETE",
    });
    this.callApi();
  };

  nameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  typeChange = (event) => {
    this.setState({ type: event.target.value });
  };
  priceChange = (event) => {
    this.setState({ price: event.target.value });
  };

  render() {
    const { bikes } = this.state;
    return (
      <div className="main">
        <div className="form">
          <h3>Awesome Bike Rental</h3>
          <h4> 🤑 Create new rent</h4>
          {addRent(
            this.add,
            this.nameChange,
            this.typeChange,
            this.priceChange
          )}
        </div>
        <div className="lists">
          <RentedBikes bikes={bikes}  cancelRent={this.cancelRent}/>
          <AvailableBikes bikes={bikes} remove={this.remove} cancelRent={this.cancelRent}/>
        </div>
      </div>
    );
  }
}

export default App;
