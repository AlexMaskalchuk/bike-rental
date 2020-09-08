import React from "react";

class AddRent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
      price: "",
      countAvailable: 0,
      isRented: false,
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

  add = async (event) => {
    const { name, type, price, isRented } = this.state;
    if (name && type && price) {
      const date = null;
      const discount = false;
      let response = await fetch(`http://localhost:9000`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, price, isRented, date, discount }),
      });
      response = await response.json();
      console.log(response);
      this.props.callApi();
      this.setState({ name: "", type: "", price: "" });
      console.log(this.state);
    }
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

  handleSubmit = (event) => {
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
    event.preventDefault();
    //this.setState({ name: "", type: "", price: "" });
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
                <option>Road</option>
                <option>Custom</option>
                <option>Mountain</option>
              </select>
            </div>
          </div>
          <div className="label-input">
            <label htmlFor="price">Price</label>
            <input
              type="number"
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
              onClick={this.add}
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
