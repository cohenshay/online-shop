import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../General/NavBar";
import SideBar from "../General/SideBar";
import Item from "../Items/Item";
import { getAllItems } from '../../actions/shop';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      images: [{
        "main": "air-vapormax/air-vapormax-1.png",
        "all": ["air-vapormax/air-vapormax-1.png",
          "air-vapormax/air-vapormax-2.png",
          "air-vapormax/air-vapormax-3.png"]
      }]
    };
  }
  componentDidMount = () => {
    this.props.getAllItems();
  }
  render() {
    return (
      <div className="main">
        <NavBar />
        <div className="content_category_wrapper">
          <SideBar />
          <div className="items-wrapper">
            {this.props.items && this.props.items.map((item, index) => (
              <Item mainImagePath={item.mainImagePath} images={[item.image1Path, item.image2Path, item.image3Path]} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  getAllItems: () => { dispatch(getAllItems()); },
});
const mapStateToProps = (state, props) => ({
  items: state.shop.items,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
