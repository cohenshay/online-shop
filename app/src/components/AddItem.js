import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { addItem } from "../actions/shop";
import { getAllCategories } from '../actions/shop';

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      audiences: ["Men", "Woman", "Kids"],
      category: "Shoes",
      audience: "Men",
      name: "",
      sport: "Lifestyle",
      price: "",
      main_img: "",
      img1: "",
      img2: "",
      img3: "",
      amount: "",
      brand: "",
      color: "",
      description: "",
      price: "",
      size: "",
      type: "",
    };
  }
  componentDidMount = () => {
    this.props.getAllCategories();
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
    formData.append("itemSport", this.state.name);
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
  getTypeOptions = () => {
    if (this.props.categories) {
      const result = this.props.categories.filter(x => x.name == this.state.category);
      if (result.length > 0)
        return result[0].types;
      return [];
    }
    // let result = [];
    // if (!this.state.category || !this.props.categories || this.props.categories.length == 0) return result;

    // switch (this.state.category) {
    //   case "Shoes":
    //     result = this.props.categories.filter(x => x.name == "Shoes").types;
    //     break;
    //   case "Clothing":
    //     result = this.state.menClothing;
    //     break;
    //   case "Accessories":
    //     result = this.state.menAccessories;
    //     break;
    //   default:
    //     return result;
    // }
    // return result;
  };
  getsportOptions = () => {

    if (this.props.categories) {
      const result = this.props.categories.filter(x => x.name == this.state.category);
      if (result.length > 0)
        return result[0].sport;
      return [];
    }
  }
  render() {
    const audienceOptions = ["Men", "Woman", "Kids"];
    const categoryOptions = this.props.categories ? this.props.categories : [];
    const colorOptions = ["Red", "Black", "Green", "Yellow", "Blue", "White", "Other"];
    const sizeOptions = ["xs", "s", "m", "l", "xl"];
    const typeOptions = this.getTypeOptions();
    const sportOptions = this.getsportOptions();
    if (this.props.categories) {
      return (
        <div className="add-page">
          <form onSubmit={this.onFormSubmit}>
            <div className="field">
              <label>Audience</label>
              <select className="audience" onChange={this.handleInputChange} name="audience" value={this.state.audience}>
                {audienceOptions.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Category</label>

              <select className="category" onChange={this.handleInputChange} name="category" value={this.state.category}>
                {categoryOptions.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Type</label>
              <select className="type" onChange={this.handleInputChange} name="type" value={this.state.type}>
                {typeOptions.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Sport</label>
              <select className="sport" onChange={this.handleInputChange} name="sport" value={this.state.sport}>
                {sportOptions.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Item name</label>
              <input type="text" className="item__name" onChange={this.handleInputChange} name="name" placeholder="name" value={this.state.name}/>
            </div>
            <div className="field">
              <label>Brand</label>
              <input type="text" className="item__brand" onChange={this.handleInputChange} name="brand" placeholder="brand" value={this.state.brand}/>
            </div>
            <div className="field">
              <label>Price</label>
              <input type="number" className="item__price" onChange={this.handleInputChange} name="price" placeholder="price" value={this.state.price}/>
            </div>
            <div className="field">

              <label>Amount</label>
              <input type="number" className="item__amount" onChange={this.handleInputChange} name="amount" placeholder="amount" value={this.state.amount}/>
            </div>
            <div className="field">
              <label>Color</label>
              <select className="color" onChange={this.handleInputChange} name="color" value={this.state.color}>
                {colorOptions.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Size</label>
              <select className="item__size" onChange={this.handleInputChange} name="size" value={this.state.size}>
                {sizeOptions.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Decription</label>
              <textarea className="item__description" onChange={this.handleInputChange} name="description" value={this.state.description}/>
            </div>
            <div className="field">
              <label>Main Image</label>
              <input type="file" className="item__main_img" onChange={this.handleInputChange} name="main_img" />
            </div>
            <div className="field">
              <label>More Images</label>
              <input type="file" className="item__img1" onChange={this.handleInputChange} name="img1" />
              <input type="file" className="item__img2" onChange={this.handleInputChange} name="img2" />
              <input type="file" className="item__img3" onChange={this.handleInputChange} name="img3" />
            </div>
            <div className="field"></div>
            <div className="field"></div>

            <button type="submit">Upload</button>
          </form>
        </div>
      )
    }
    else {
      return null;
    }
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  addItem: formData => {
    dispatch(addItem(formData));
  },
  getAllCategories: () => {
    dispatch(getAllCategories());
  }
});
const mapStateToProps = (state, props) => ({
  categories: state.shop.categories
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItem);
