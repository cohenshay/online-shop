import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      menues: ["Home", "About", "Contact", "Chat"],
      categories: ["Men", "Woman", "Kids"]
    };
  }

  render() {
    return (
      <div className="nav-wrapper">
        <div className="nav-status-bar">
          <ul className="nav-status-right_item-wrapper">
            <li className="nav-status-right_item">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-status-right_item">
              <Link to="/logout">Logout</Link>
            </li>
            <li className="nav-status-right_item">
              <img className="cart-img" src="./images/cart.png" />
            </li>
          </ul>
          <ul className="nav-status-left_item-wrapper">
            <li className="nav-status-left_item">
              <Link to="/">Home</Link>
            </li>
            {this.state.categories
              .filter(x => x != "Home")
              .map((item, index) => (
                <li className="nav-status-left_item" key={index}>
                  <Link to={`/${item}`}>{item}</Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="nav-categories-wrapper">
          <div className="search-box">
            <img src="hhh" />
            <input type="text" placeholder="Search" />
          </div>
          <div className="logo">
            <img src="hhh" />
          </div>
          {this.state.menues.map((item, index) => (
            <div className="nav-categories_item" key={index}>
              <Link to={`/${item}`}>{item}</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => ({});
const mapStateToProps = (state, props) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
