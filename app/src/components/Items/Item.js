import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Item extends Component {
  constructor() {
    super();
    this.state = {
      isHovered: false,
      imagesPrefix: "./images/items/",
      goodRanking: 10,
      badRanking: 2,
      price: 190,
      currency: "$"
    };
  }
  toggleMenu = e => {
    this.setState(prevState => ({ isHovered: !prevState.isHovered }));
  };
  render() {
    return (
      <div className={`item-wrapper ${this.state.isHovered ? "hovered" : ""}`} onMouseEnter={e => this.toggleMenu(e, "open")} onMouseLeave={e => this.toggleMenu(e, "close")} >
        <img className="item_img" src={`${this.state.imagesPrefix}${this.props.mainImagePath}`} />
        <div className={`image-slider-wrapper ${this.state.isHovered ? "hovered" : ""}`}>
          {this.props.images.map((item, index) => (
            <img key={index} src={`${this.state.imagesPrefix}${item}`} className="img-in-slider" />))}
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
)(Item);
