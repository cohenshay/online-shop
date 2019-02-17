import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {logout} from '../../actions/auth';
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      menues: ["Home", "About", "Contact", "Chat"],
      categories: ["Men", "Woman", "Kids"],
      menShoes: ["SNKRS Launch Calendar", "Lifestyle", "Running", "Training & Gym", "Basketball", "Jordan", "Football",
        "Soccer", "Baseball", "Golf", "Skateboarding", "Tennis", "Boots", "All Shoes"],
      menClothing: ["Tops & T-Shirts", "Shorts", "Polos", "Hoodies & Sweatshirts", "Jackets & Vests", "Pants & Tights",
        "Surf & Swimwear", "Nike Pro & Comression", "Socks & Underwear", "Big & tall", "All Clothing"],
      menAccessories: ["Bags & Backpacks", "Apple Wath Nike+"],

    };
  }
  toggleMenu = (menuName, status) => {
      var element = document.querySelector(".nav-expand");
      element.style.display = status == "open" ? "block" : "none";
  };
  render() {
    return (
      <div className="nav-wrapper">
        <div className="nav-status-bar">
          <ul className="nav-status-right_item-wrapper">
            <li className="nav-status-right_item">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-status-right_item">
              <div onClick={()=>this.props.logout()}>Logout</div>
            </li>
            <li className="nav-status-right_item">
              <img className="cart-img" src="./images/cart.png" />
            </li>
          </ul>
          <ul className="nav-status-left_item-wrapper">
            <li className="nav-status-left_item">
              <Link to="/">Home</Link>
            </li>
            {this.state.menues.filter(x => x != "Home").map((item, index) => (
              <li className="nav-status-left_item" key={index}>
                <Link className="menu-link" to={`/${item}`}> {item}
                </Link>
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
          <ul>
            {this.state.categories.map((item, index) => (
              <li className="nav-categories_item" onMouseEnter={() => this.toggleMenu(item, "open")} onMouseLeave={() => this.toggleMenu(item, "close")} key={index} >
                <Link to={`/${item}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-expand">
          <div className="nav-expand-categories-wrapper">
            <div className="nav-expand-category">
              <div className="nav-expand-category_title">SHOES</div>
              <ul>
                {this.state.menShoes.map((item, index) => (
                  <li key={index} className="nav-expand_item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav-expand-category">
              <div className="nav-expand-category_title">CLOTHING</div>
              <ul>
                {this.state.menClothing.map((item, index) => (
                  <li key={index} className="nav-expand_item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav-expand-category">
              <div className="nav-expand-category_title">
                ACCESSORIES & EQUIPMENT
                  </div>

              <ul>
                {this.state.menAccessories.map((item, index) => (
                  <li key={index} className="nav-expand_item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});
const mapStateToProps = (state, props) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
