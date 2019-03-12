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
      mainImage: "",
    };
  }
  componentDidMount = () => {
    this.setState({ mainImage: this.props.mainImagePath })
  }
  toggleMenu = e => {
    this.setState(prevState => ({ isHovered: !prevState.isHovered }));
  };
  renderItemDetails=()=>{
    this.props.renderItemDetails(this.props.item)
  }
  render() {
    return (
      <div className={`item-wrapper ${this.state.isHovered ? "hovered" : ""}`}
       onMouseEnter={e => this.toggleMenu(e, "open")}
       onMouseLeave={e => this.toggleMenu(e, "close")} 
       onClick={()=>this.renderItemDetails()}>
        <img className="item_img" src={`${this.state.imagesPrefix}${this.state.mainImage}`} />
        <div className={`image-slider-wrapper ${this.state.isHovered ? "hovered" : ""}`}>
          {this.props.images.filter(x=>x!=null).map((item, index) => (
            <img key={index} src={`${this.state.imagesPrefix}${item}`} 
                className="img-in-slider" 
                onMouseEnter={() => { this.setState({ mainImage: this.props.images[index] }) }} />))}
        </div>
        <div className="item_name">
          {this.props.item.name}
        </div>
        <div className="item_price">
          {`${this.props.item.price}$`}
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
