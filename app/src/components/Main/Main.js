import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../General/NavBar";
import SideBar from "../General/SideBar";
import Item from "../Items/Item";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      images: [{"main":"air-vapormax/air-vapormax-1.png",
      "all":[ "air-vapormax/air-vapormax-1.png",
      "air-vapormax/air-vapormax-2.png",
      "air-vapormax/air-vapormax-3.png"]
    }]
    };
  }

  render() {
    return (
      <div className="main">
        <NavBar />      
        <div className="content_category_wrapper">
        <SideBar />
          {/* <div className="category_title">CATEGORY</div> */}
          <div className="items-wrapper">
            {this.state.images.map((item, index) => (
              <Item mainImagePath={item.main} images={item.all} key={index} />
            ))}
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
)(Main);
