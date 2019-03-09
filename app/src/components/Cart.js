import React, { Component } from "react";
import { connect } from "react-redux";
import Payments from './Payment';
import LoadingPage from "./LoadingPage";

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            totalPrice: 0,
            itemsToPay: [],
            didUserCommited: false,
            isLoadingBtn: false
        };
    }

    componentWillMount() {
        if (this.props.items && this.props.items.length > 0) {

            const itemsToPay = [];
            for (var i = 0; i < this.props.items.length; i++) {
                let item = {
                    "price": parseInt(this.props.items[i].price),
                    "amount": 1
                }
                itemsToPay.push(item);
            }

            this.setState({ itemsToPay }, this.updateTotalPrice);
        }
    }
    updateTotalPrice = () => {
        const totalPrice = this.state.itemsToPay.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
        this.setState({ totalPrice });
    }
    handleAmountChange = (e) => {
        if (isNaN(e.target.value) || !!!e.target.value)
            return
        if (parseInt(e.target.value) < 1)
            return;
        const itemsToPay = this.state.itemsToPay.map(function (item, index) {
            if (index == parseInt(e.target.name)) {
                return {
                    "price": item.price,
                    "amount": parseInt(e.target.value)
                }
            }
            else {
                return item;
            }
        });

        this.setState({ itemsToPay }, this.updateTotalPrice)
    }
    handlePlus = (e) => {

        const itemsToPay = this.state.itemsToPay.map(function (item, index) {
            if (index == parseInt(e.target.name)) {
                return {
                    "price": item.price,
                    "amount": item.amount + 1
                }
            }
            else {
                return item;
            }
        });

        this.setState({ itemsToPay }, this.updateTotalPrice)
    }

    handleMinus = (e) => {
        if (parseInt(this.state.itemsToPay[parseInt(e.target.name)].amount) == 1)
            return;
        const itemsToPay = this.state.itemsToPay.map(function (item, index) {
            if (index == parseInt(e.target.name)) {
                return {
                    "price": item.price,
                    "amount": item.amount - 1
                }
            }
            else {
                return item;
            }
        });

        this.setState({ itemsToPay }, this.updateTotalPrice)
    }
    loadBtn = () => {
        this.setState({ "isLoadingBtn": true, "didUserCommited": true },
            () => {
                setTimeout(() => {
                    this.setState({ "isLoadingBtn": false })
                }, 3000)
            })
    }
    render() {
        if (this.props.currentUser == null || this.props.currentUser == "")
            return <div>Please Login</div>
        return (
            <div className="shopping-cart">

                <div className="title">
                    Shopping Bag
            </div>

                {this.props.items && this.props.items.length > 0 && this.props.items.map((item, index) => (
                    <div className="item" key={index}>
                        <div className="buttons">
                            <span className="delete-btn" onClick={() => this.props.removeItem(item, index)}></span>
                        </div>

                        <div className="image">
                            <img src={`images/items/${item.mainImagePath}`} alt="" style={{ height: "100px" }} />
                        </div>

                        <div className="description">
                            <span>{item.name}</span>
                        </div>

                        <div className="quantity">
                            <button className="plus-btn" type="button" name={`${index}`} onClick={this.handlePlus}>
                                <img src="/images/plus.svg" alt="" name={`${index}`} onClick={this.handlePlus} />
                            </button>
                            <input type="text" name={`${index}`} value={this.state.itemsToPay[index].amount} onChange={this.handleAmountChange} />
                            <button className="minus-btn" type="button" name={`${index}`} onClick={this.handleMinus}>
                                <img src="/images/minus.svg" alt="" name={`${index}`} onClick={this.handleMinus} />
                            </button>
                        </div>

                        <div className="price">${item.price}</div>
                    </div>
                ))}

                <div className="total-price">
                    Total Price: {this.state.totalPrice}$
                </div>
                {this.state.isLoadingBtn == false && this.state.didUserCommited == false && <button onClick={() => { this.loadBtn() }}>Create Secure Buy-In</button>}
                {this.state.isLoadingBtn && <LoadingPage />}
                {this.state.didUserCommited &&
                    <Payments
                        totalPrice={this.state.totalPrice}
                        userDetails={this.props.currentUser}
                        display={this.state.isLoadingBtn ? "none" : "block"} />}

            </div>)
    }
}

const mapDispatchToProps = (dispatch, props) => ({});
const mapStateToProps = (state, props) => ({
    currentUser: state.auth.currentUser || JSON.parse(localStorage.getItem("currentUser")),
    items: state.shop.itemsToPay
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);