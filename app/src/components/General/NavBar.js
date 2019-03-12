import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { logout } from '../../actions/auth';
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      menues: ["Home", "About", "ContactUs"],
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
            {this.props.currentUser && this.props.currentUser.isAdmin &&
              <li className="nav-status-right_item pointer">
                <Link className="menu-link" to="/addItem" >Manage</Link>
              </li>}
            {localStorage.getItem('clientToken') == null && <li className="nav-status-right_item">
              <Link to="/login">Login</Link>
            </li>}
            {localStorage.getItem('clientToken') && <li className="nav-status-right_item pointer">
              <div onClick={() => this.props.logout()}>Logout</div>
            </li>}
            <li className="nav-status-right_item">
              <Link to="/cart"> <img className="cart-img" src={`${window.location.origin}${this.props.itemsToPay.length > 0 ? "/images/full-cart.png" : "/images/cart.png"}`} /></Link>
            </li>
            <li className="nav-status-right_item">
              <Link to="/userDetails"> {this.props.currentUser && <img className="cart-img" src={window.location.origin + this.props.currentUser.image} />}</Link>
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

          <div className="logo">
            <img src={`${window.location.origin}/images/nike-logo.png`} className="nike-logo" />
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
const mapStateToProps = (state, props) => ({
  currentUser: state.auth.currentUser || JSON.parse(localStorage.getItem("currentUser")),
  itemsToPay: state.shop.itemsToPay

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
