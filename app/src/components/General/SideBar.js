import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      showSport: true,
      showAllSport: false,
      categories: ["Shoes", "Sport Bras", "Bodysuits", "Compression & Nike Pro", "Tops & T-Shirts", "Hoodies & Sweatshirts",
        "Jackets & Gilets", "Trousers & Tights", "Tracksuits", "Jumpsuits & Rompers", "Skirts & Dresses",  "Surf & Swimwear",
        "Accessories & Equipment"
      ],
      sport: [ "Lifestyle", "Running", "BasketBall", "Football", "Soccer", "Trainning & Gym", "Skateboarding",
        "Baseball / Softball", "Golf","Tennis", "Track & Field", "Yoga", "Lacrosse", "Volleyball", "Cheerleading",
        "Surf & Swimming","Surfing", "Walking","Boxing", "Ice Hockey", "Spinning"
      ],
      brand: [ "Nike", "Converse", "Hurley", "Jordan","Nike Sportswear", "NikeLab"
      ]
    };
  }
  toggleCategory= category => {
    if (category == "sport") {
      this.setState(prevState => ({ showSport: !prevState.showSport }));
    }
  };
  toggleMore = category => {
    if (category == "sport") {
      this.setState(prevState => ({ showAllSport: !prevState.showAllSport }));
    }
  };

  render() {
    return (
      <div className="side-bar">
        <div className="side-bar-caegories">
          {this.state.categories.map((item, index) => (
            <div className="side-bar_item" key={index}>
              <Link to={`/${item}`}>{item}</Link>
            </div>
          ))}
        </div>
        <div className="filters">
          <div className="filter_title">FILTERS</div>
          <div className="filter-category-wrapper">
            <div className="filter-category_title">SPORT</div>
            <img className="minus-img" src={this.state.showSport? "./images/minus.png":"./images/plus.png"} onClick={()=>this.toggleCategory("sport")} />
            {this.state.showAllSport && this.state.showSport &&
              this.state.sport.map((item, index) => (
                <div className="filter-item-wrapper" key={index}>
                  <input type="checkbox" />
                  <div className="filter_item_text">{item}</div>
                </div>
              ))}
            {this.state.showAllSport == false && this.state.showSport &&
              this.state.sport.slice(0, 6).map((item, index) => (
                <div className="filter-item-wrapper" key={index}>
                  <input type="checkbox" />
                  <div className="filter_item_text">{item}</div>
                </div>
              ))}
            {this.state.showAllSport == false && this.state.showSport &&(
              <div
                className="more-button-wrapper"
                onClick={() => this.toggleMore("sport")}
              >
                <img className="more-botton_img" src="./images/plus.png" />
                <div className="more-button_text">More</div>
              </div>
            )}
          </div>
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
)(SideBar);
