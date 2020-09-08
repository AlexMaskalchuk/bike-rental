import React from "react";
import cn from 'classnames';
import { addBike } from "../requests/addBike";

class AddRent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
      price: "",
      countAvailable: 0,
      isRented: false,
      touched: false,
      classInputName: "form-control",
      classInputType: "form-control",
      classInputPrice: "form-control",
    };
  }

  validateName = () => {
    const { name } = this.state;
    !name
      ? this.setState({ classInputName: "form-control danger" })
      : this.setState({ classInputName: "form-control" });
  };
  validateType = () => {
    const { type } = this.state;
    console.log(type);
    !type
      ? this.setState({ classInputType: "form-control danger" })
      : this.setState({ classInputType: "form-control" });
  };
  validatePrice = () => {
    const { price } = this.state;
    console.log(price);
    !price
      ? this.setState({ classInputPrice: "form-control danger" })
      : this.setState({ classInputPrice: "form-control" });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, type, price } = this.state;
    if (name && type && price) {
      await addBike(name, type, price);
      this.props.getBikes();
      this.setState({ name: "", type: "", price: "" });
    }
    this.validateForm();
  };

  nameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  typeChange = (event) => {
    this.setState({ type: event.target.value });
  };

  priceChange = (event) => {
    const value = event.target.value;
    const reg = /^-?\d+\.?\d*$/;
    const check = reg.test(value);
    if (check || !value) {
      this.setState({ price: event.target.value });
    }
  };

  validateForm = () => {
    const { name, type, price } = this.state;
    if (!name) {
      this.setState({ classInputName: "form-control danger" });
    }
    if (!type) {
      this.setState({ classInputType: "form-control danger" });
    }
    if (!price) {
      this.setState({ classInputPrice: "form-control danger" });
    }
  };

  render() {
    const {
      name,
      type,
      price,
      touched,
      classInputName,
      classInputType,
      classInputPrice,
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row list-group-item add">
          <div className="label-input">
            <label htmlFor="bike-name">Bike name</label>
            <input
              id="bike-name"
              value={name}
              className={classInputName}
              onChange={this.nameChange}
              onBlur={this.validateName}
            ></input>
          </div>
          <div className="label-input">
            <label htmlFor="bike-type">Bike type</label>
            <div className="dropdown">
              <select
                id="bike-type"
                value={type}
                className={classInputType}
                onChange={this.typeChange}
                onBlur={this.validateType}
              >
                <option hidden selected value>
                  {" "}
                  {type}
                </option>
                <option>Road</option>
                <option>Custom</option>
                <option>Mountain</option>
              </select>
            </div>
          </div>
          <div className="label-input-price">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              value={price}
              className={classInputPrice}
              onChange={this.priceChange}
              onBlur={this.validatePrice}
            ></input>
          </div>
          <div className="submit-button">
            <button
              className="btn btn-success"
              type="submit"
            >
              Submit rent
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddRent;
