import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ItemDetails extends Component {
    constructor() {
        super();
        this.state = {
            imagesPrefix: "./images/items/",
            item: null,
            sizes: ["S", "M", "XL"]
        };
    }
    componentDidMount() {
        this.setState({ item: this.props.history.location.state })
    }
    render() {
        if (this.state.item) {
            return (
                <div className="item-details-container">
                    <div className="right-sidebar-container">

                        <div className="price-category-wrapper">
                            <div className="category">
                                {this.state.item.category}
                            </div>
                            <div className="item_price">
                                {`${this.state.item.price}$`}
                            </div>
                        </div>

                        <div className="item_name">
                            {this.state.item.name}
                        </div>
                        <div className="item_sizes">
                            Select Size
                            {this.state.sizes.map((size, index) => (
                                <div className="size-box_container">
                                    <div className="item_size">
                                        {size}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="add_to_card">
                            <button className="add-button">Add to Cart</button>
                        </div>
                        <div className="description">
                            {this.state.item.description}
                        </div>
                        <Link to={`/chat/${this.state.item.name}`} params={{subject:this.state.item.name}}>Chat</Link>
                    </div>
                    <div className="item-images">
                        <div className="images-row">
                            <img src={`${this.state.imagesPrefix}${this.state.item.mainImagePath}`} className="item-details_image"></img>
                            <img src={`${this.state.imagesPrefix}${this.state.item.image1Path}`} className="item-details_image"></img>
                            <img src={`${this.state.imagesPrefix}${this.state.item.image2Path}`} className="item-details_image"></img>
                            <img src={`${this.state.imagesPrefix}${this.state.item.image3Path}`} className="item-details_image"></img>
                        </div>
                    </div>
                </div>
            );
        }
        else return null;
    }
}
const mapDispatchToProps = (dispatch, props) => ({});
const mapStateToProps = (state, props) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemDetails);
