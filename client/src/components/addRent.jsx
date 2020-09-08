import React from "react";
import cn from "classnames";
import { addBike } from "../requests/addBike";

class AddRent extends React.Component {
  state = {
    name: "",
    type: "",
    price: "",
    classInputName: "form-control",
    classInputType: "form-control",
    classInputPrice: "form-control",
  };

  validateField = (className, field) => {
    this.setState({ [className]: cn("form-control", { danger: !field }) });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, type, price } = this.state;
    this.validateForm();
    if (name && type && price) {
      await addBike(name, type, price);
      this.props.getBikes();
      this.setState({ name: "", type: "", price: "" });
    }
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
    this.setState({
      classInputName: cn("form-control", { danger: !name }),
      classInputType: cn("form-control", { danger: !type }),
      classInputPrice: cn("form-control", { danger: !price }),
    });
  };

  render() {
    const {
      name,
      type,
      price,
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
              onBlur={() => this.validateField("classInputName", name)}
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
                onBlur={() => this.validateField("classInputType", type)}
              >
                <option hidden defaultValue>
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
              onBlur={() => this.validateField("classInputPrice", price)}
            ></input>
          </div>
          <div className="submit-button">
            <button className="btn btn-success" type="submit">
              Submit rent
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddRent;
