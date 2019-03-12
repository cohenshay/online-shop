import React, { Component } from "react";
import { connect } from "react-redux";
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Details from './Comp/Details';
import Messages from './Comp/Messages';
import Cart from '../Cart';

class UserDetails extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    goToPrivateChat = (user)=>{
        this.props.history.push(`/privateChat/${user._id}`);
    }
    render() {
        return (
            <Tabs>
                <TabList>
                    <Tab>Details</Tab>
                    <Tab>Messages</Tab>
                    <Tab>Cart</Tab>
                </TabList>

                <TabPanel>
                  <Details currentUser={this.props.currentUser}/>
                </TabPanel>
                <TabPanel>
                    <Messages currentUser={this.props.currentUser} goToPrivateChat={this.goToPrivateChat}/>
                </TabPanel>
                <TabPanel>
                    <Cart />
                </TabPanel>
            </Tabs>);



    }
}

const mapDispatchToProps = (dispatch, props) => ({});
const mapStateToProps = (state, props) => ({
    currentUser: state.auth.currentUser || JSON.parse(localStorage.getItem("currentUser")),
    items: state.shop.itemsToPay
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);