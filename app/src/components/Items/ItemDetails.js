import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Payments from '../Payment';
import { addItemToCart } from '../../actions/shop';

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
    addItem = () => {
        this.props.addItemToCart(this.state.item)
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
                            <div className="item_name itemWrap">
                                <div className="itemTitle">name:</div>
                                {this.state.item.name}
                            </div>
                            <div className="item_price itemWrap">
                                <div className="itemTitle">price:</div>
                                {`${this.state.item.price}$`}
                            </div>
                        </div>
                        <div className="item_sizes itemWrap">
                            <div className="itemTitle">Select Size:</div>
                            {this.state.sizes.map((size, index) => (
                                <div className="size-box_container" key={index}>
                                    <div className="item_size pointer">
                                        {size}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="add_to_card itemWrap">
                            <button className="add-button" onClick={this.addItem}>Add to Cart</button>
                        </div>
                        <div className="description itemWrap">
                            {this.state.item.description}
                        </div>

                        <Link className="chatBtn" to={`/chat/${this.state.item.name}`} params={{ subject: this.state.item.name }}>Chat</Link>
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
const mapDispatchToProps = (dispatch, props) => ({
    addItemToCart: (item) => { dispatch(addItemToCart(item)) }
});
const mapStateToProps = (state, props) => ({
    itemsToPay: state.shop.itemsToPay
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemDetails);
