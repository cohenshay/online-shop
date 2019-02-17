import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { filterTypes, getAllCategories, getTypesByCategory,filterByCategory } from '../../actions/shop';
class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      showSport: true,
      showAllSport: false,
      currentCategory: "5c61af061967772f20cb0e29",
    };
  }
  componentDidMount = () => {
    this.props.getAllCategories();
  }
  toggleCategory = category => {
    if (category == "sport") {
      this.setState(prevState => ({ showSport: !prevState.showSport }));
    }
  };
  toggleMore = category => {
    if (category == "sport") {
      this.setState(prevState => ({ showAllSport: !prevState.showAllSport }));
    }
  };
  applyFilterTypes = (e) => {
    var inputs = document.getElementsByTagName("input");
    var cbs = []; //will contain all checkboxes
    var checked = []; //will contain all checked checkboxes
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        cbs.push(inputs[i]);
        if (inputs[i].checked) {
          checked.push(inputs[i]);
        }
      }
    }
    this.props.filterTypes(checked.map((filter) => filter.name));
  }
  getsportOptions = () => {

    if (this.props.categories) {
      const result = this.props.categories.filter(x => x._id == this.state.currentCategory);
      if (result.length > 0)
        return result[0].sport;
      return [];
    }
  }
  handleCategory = (categoryID) => {
    this.setState({ currentCategory: categoryID });
    this.props.getTypesByCategory(categoryID);
  }
  handleTypeClick = (items)=>{
    this.props.filterByCategory(items);
  }
  render() {
    const sportOptions = this.getsportOptions();
    return (
      <div className="side-bar">
        <div className="side-bar-caegories">
          {this.props.categories && this.props.categories.map((item, index) => (
            <div className={`side-bar_item${this.state.currentCategory==item._id? " chosen-category":""}`} key={index} onClick={() => this.handleCategory(item._id)}>{item.name}
              {this.props.typesByCategory && this.props.typesByCategory.category.name == item.name &&
                this.props.typesByCategory.types && this.props.typesByCategory.types.map((item, index) =>
                  <div key={index} onClick={()=>this.handleTypeClick(item)} className="category-types">{item.type}{`(${item.items && item.items.length})`}</div>
                )}
            </div>

          ))}
        </div>
        <div className="filters">
          <div className="filter_title">FILTERS</div>
          <div className="filter-category-wrapper">
            <div className="filter-category_title">SPORT</div>
            <img className="minus-img" src={this.state.showSport ? "./images/minus.png" : "./images/plus.png"} onClick={() => this.toggleCategory("sport")} />
            {this.state.showAllSport && this.state.showSport && sportOptions &&
              sportOptions.map((item, index) => (
                <div className="filter-item-wrapper" key={index}>
                  <input type="checkbox" name={item} onClick={this.applyFilterTypes} />
                  <div className="filter_item_text">{item}</div>
                </div>
              ))}
            {this.state.showAllSport == false && this.state.showSport && sportOptions &&
              sportOptions.slice(0, 6).map((item, index) => (
                <div className="filter-item-wrapper" key={index}>
                  <input type="checkbox" name={item} onClick={this.applyFilterTypes} />
                  <div className="filter_item_text">{item}</div>
                </div>
              ))}
            {this.state.showAllSport == false && this.state.showSport && sportOptions && (
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
const mapDispatchToProps = (dispatch, props) => ({
  filterTypes: (types) => { dispatch(filterTypes(types)) },
  filterByCategory: (types) => { dispatch(filterByCategory(types)) },
  getAllCategories: () => { dispatch(getAllCategories()); },
  getTypesByCategory: (categoryID) => { dispatch(getTypesByCategory(categoryID)); },
});
const mapStateToProps = (state, props) => ({
  categories: state.shop.categories,
  typesByCategory: state.shop.typesByCategory
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
