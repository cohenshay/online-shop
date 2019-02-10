import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { addItem } from "../actions/shop";

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      audiences: ["Men", "Woman", "Kids"],
      menShoes: [
        "SNKRS Launch Calendar",
        "Lifestyle",
        "Running",
        "Training & Gym",
        "Basketball",
        "Jordan",
        "Football",
        "Soccer",
        "Baseball",
        "Golf",
        "Skateboarding",
        "Tennis",
        "Boots",
        "All Shoes"
      ],
      menClothing: [
        "Tops & T-Shirts",
        "Shorts",
        "Polos",
        "Hoodies & Sweatshirts",
        "Jackets & Vests",
        "Pants & Tights",
        "Surf & Swimwear",
        "Nike Pro & Comression",
        "Socks & Underwear",
        "Big & tall",
        "All Clothing"
      ],
      menAccessories: ["Bags & Backpacks", "Apple Wath Nike+"]
    };
  }
  handleInputChange = (event, a) => {
    const target = event.target;
    let value = "";
    if (target.type === "checkbox") value = target.checked;
    else if (target.type === "file") value = target.files[0];
    else value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  onFormSubmit = e => {
    e.preventDefault();
    //var form = document.querySelector("form");
    var formData = new FormData();

    formData.append("audience", this.state.audience);
    formData.append("category", this.state.category);
    formData.append("itemName", this.state.name);
    formData.append("itemPrice", this.state.price);
    formData.append("itemMainImg", this.state.main_img);
    formData.append("itemImg1", this.state.img1);
    formData.append("itemImg2", this.state.img2);
    formData.append("itemImg3", this.state.img3);
    formData.append("amount", this.state.amount);
    formData.append("brand", this.state.brand);
    formData.append("color", this.state.color);
    formData.append("description", this.state.description);
    formData.append("price", this.state.price);
    formData.append("size", this.state.size);
    formData.append("type", this.state.type);
   
 
    this.props.addItem(formData);
  };
  getOptions = () => {
    if (!this.state.category) return [];
    switch (this.state.category) {
      case "Shoes":
        return this.state.menShoes;
      case "Clothing":
        return this.state.menClothing;
      case "Accessories":
        return this.state.menAccessories;
      default:
        return [];
    }
  };
  render() {
    const audienceOptions = this.state.audiences;
    const categoryOptions = ["Shoes", "Clothing", "Accessories"];
    const colorOptions = [
      "Red",
      "Black",
      "Green",
      "Yellow",
      "Blue",
      "White",
      "Other"
    ];
    const sizeOptions = ["xs", "s", "m", "l", "xl"];
    const typeOptions = this.getOptions();
    return (
      <div className="add-page">
        <form onSubmit={this.onFormSubmit}>
          <label>Audience</label>
          <select className="audience" onChange={this.handleInputChange} name="audience"  >
            {audienceOptions.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label>Category</label>

          <select
            className="category"
            onChange={this.handleInputChange}
            name="category"
          >
            {categoryOptions.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label>Type</label>
          <select
            className="type"
            onChange={this.handleInputChange}
            name="type"
          >
            {typeOptions.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label>Item name</label>
          <input
            type="text"
            className="item__name"
            onChange={this.handleInputChange}
            name="name"
            placeholder="name"
          />
          <label>Brand</label>
          <input
            type="text"
            className="item__brand"
            onChange={this.handleInputChange}
            name="brand"
            placeholder="brand"
          />
          <label>Price</label>
          <input
            type="number"
            className="item__price"
            onChange={this.handleInputChange}
            name="price"
            placeholder="price"
          />
          <label>Amount</label>
          <input
            type="number"
            className="item__amount"
            onChange={this.handleInputChange}
            name="amount"
            placeholder="amount"
          />
          <label>Color</label>
          <select
            className="color"
            onChange={this.handleInputChange}
            name="color"
          >
            {colorOptions.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label>Size</label>
          <select
            className="item__size"
            onChange={this.handleInputChange}
            name="size"
          >
            {sizeOptions.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label>Decription</label>
          <textarea
            className="item__description"
            onChange={this.handleInputChange}
            name="description"
          />
          <label>Main Image</label>
          <input
            type="file"
            className="item__main_img"
            onChange={this.handleInputChange}
            name="main_img"
          />
          <label>More Images</label>
          <input
            type="file"
            className="item__img1"
            onChange={this.handleInputChange}
            name="img1"
          />
          <input
            type="file"
            className="item__img2"
            onChange={this.handleInputChange}
            name="img2"
          />
          <input
            type="file"
            className="item__img3"
            onChange={this.handleInputChange}
            name="img3"
          />

          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  addItem: formData => {
    dispatch(addItem(formData));
  }
});
const mapStateToProps = (state, props) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItem);
