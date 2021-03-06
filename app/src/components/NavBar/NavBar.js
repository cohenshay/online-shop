import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { logout } from '../../actions/auth';
import { filterTypes, getAllCategories, getTypesByCategory, filterByCategory } from '../../actions/shop';
import Notifications from './Comp/Notifications';

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
      openNotifications: false,
      newNotifiactions:[]
    };
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.newNotifiactions != this.props.newNotifiactions) {
      this.setState({newNotifiactions:nextProps.newNotifiactions.filter(x=>x.sender!=this.props.currentUser.username)})
    }
  }
  toggleMenu = (menuName, status) => {
    var element = document.querySelector(".nav-expand");
    element.style.display = status == "open" ? "block" : "none";
  };

  handleTypeClick = (items) => {
    this.props.filterByCategory(items);
  }

  openNotifications = (flag) => {
    this.setState({ openNotifications: flag })
  }
  render() {
    return (
      <div className="nav-wrapper">
        <div className="nav-status-bar">
          <ul className="nav-status-right_item-wrapper">
            {
              this.state.newNotifiactions.length > 0 &&
              <div className="nav-status-right_item pointer bell" onClick={() => this.openNotifications(true)}>
                <span className="num-notifications">{this.state.notifications}</span>
                <img className="bell" src={window.location.origin + "/images/bell.png"} />
              </div>
            }

            {
              this.props.currentUser && this.props.currentUser.isAdmin &&
              <li className="nav-status-right_item pointer">
                <div className="menu-link" to="/addItem" >Manage</div>
              </li>
            }
            {
              localStorage.getItem('clientToken') == null && <li className="nav-status-right_item">
                <Link to="/login">Login</Link>
              </li>
            }
            {
              localStorage.getItem('clientToken') && <li className="nav-status-right_item pointer">
                <div onClick={() => this.props.logout()}>Logout</div>
              </li>
            }
            <li className="nav-status-right_item">
              <Link to="/cart"> <img className="cart-img" src={`${window.location.origin}${this.props.itemsToPay.length > 0 ? "/images/full-cart.png" : "/images/cart.png"}`} /></Link>
            </li>
            <li className="nav-status-right_item">
              <Link to="/userDetails"> {this.props.currentUser && <img className="cart-img" src={window.location.origin + this.props.currentUser.image} />}</Link>
            </li>
          </ul>
          {
            this.state.openNotifications &&
            <Notifications newNotifiactions={this.props.newNotifiactions} close={() => this.openNotifications(false)} />
          }
          <ul className="nav-status-left_item-wrapper">
            <li className="nav-status-left_item">
              <Link to="/">Home</Link>
            </li>
            {
              this.state.menues.filter(x => x != "Home").map((item, index) => (
                <li className="nav-status-left_item" key={index}>
                  <Link className="menu-link" to={`/${item}`}> {item}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="nav-categories-wrapper">

          <div className="logo">
            <img src={`${window.location.origin}/images/nike-logo.png`} className="nike-logo" />
          </div>
          <ul>
            {this.state.categories.map((item, index) => (
              <li className="nav-categories_item" onMouseEnter={() => this.toggleMenu(item, "open")} key={index} >
                <Link to={`/${item}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-expand" onMouseLeave={() => this.toggleMenu(null, "close")}>
          <div className="nav-expand-categories-wrapper">
            <div className="nav-expand-category">
              <div className="nav-expand-category_title">SHOES</div>
              <ul>
                {this.state.menShoes.map((item, index) => (
                  <div onClick={() => this.handleTypeClick(item)} key={index} className="nav-expand_item pointer">{item}</div>
                ))}
              </ul>
            </div>
            <div className="nav-expand-category">
              <div className="nav-expand-category_title">CLOTHING</div>
              <ul>
                {this.state.menClothing.map((item, index) => (
                  <div onClick={() => this.handleTypeClick(item)} key={index} className="nav-expand_item pointer">{item}</div>
                ))}
              </ul>
            </div>
            <div className="nav-expand-category">
              <div className="nav-expand-category_title">
                ACCESSORIES & EQUIPMENT
                  </div>

              <ul>
                {this.state.menAccessories.map((item, index) => (
                  <div onClick={() => this.handleTypeClick(item)} key={index} className="nav-expand_item pointer">{item}</div>
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
  logout: () => dispatch(logout()),
  filterByCategory: (types) => { dispatch(filterByCategory(types)) },
});
const mapStateToProps = (state, props) => ({
  currentUser: state.auth.currentUser || JSON.parse(localStorage.getItem("currentUser")),
  itemsToPay: state.shop.itemsToPay,
  newNotifiactions: state.user.newNotifiactions || []
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
