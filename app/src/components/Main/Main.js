import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../General/SideBar";
import Item from "../Items/Item";
import { getAllItems } from '../../actions/shop';
import LoadingPage from '../LoadingPage';

class Main extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentDidMount = () => {
    this.props.getAllItems();
  }
  renderItemDetails = (item) => {
    this.props.history.push("/ItemDetails", item)
  }
  render() {
    if (this.props.items) {
      return (

        <div className="content_category_wrapper">
          <SideBar />
          <div className="items-wrapper">
            {this.props.items.length > 0 && this.props.items.map((item, index) => (
              <Item mainImagePath={item.mainImagePath}
                images={[item.image1Path, item.image2Path, item.image3Path]}
                item={item} key={index}
                renderItemDetails={this.renderItemDetails} />
            ))}
          </div>
        </div>
      );
    }
    else return <LoadingPage/>
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
