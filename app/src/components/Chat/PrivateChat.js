import React, { Component } from "react";
import { savePrivateMessage, getConversation } from '../../actions/privateMessages';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
const moment = require('moment');

class PrivateChat extends Component {
    constructor() {
        super();
        this.state = {
            privateChatWith: "",
            privateMessages: [],
            message: "",
            socket: socketIOClient("http://127.0.0.1:5000"),
        };
    }
    handleMessage = (e) => {
        this.setState({ "message": e.target.value })
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.sendPrivateMessage(this.state.message);
            this.setState({ message: "" });
        }

    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.privateMessages != this.props.privateMessages) {
            this.setState({
                privateMessages: nextProps.privateMessages.messages,
            })
        }
    }
    getPrivateMessages = () => {
        const data = {
            "receiver": this.state.privateChatWith,
        }
        this.props.getConversation(data)
    }
    sendPrivateMessage = (message) => {
     
        const msg = {
            message,
            receiver: this.state.privateChatWith,
            sender:this.props.currentUser._id,
            createdAt: moment.utc().toString(),
        }
        this.state.socket.emit('getPrivateMessage', msg);
        this.props.savePrivateMessage(msg)
    }
    componentDidMount = () => {
        this.setState({ "privateChatWith": this.props.match.params.otheUser }, () => { this.getPrivateMessages() })

        this.state.socket.on("connect", (err) => {
            if (err)
                return console.log(err);

            this.state.socket.emit('join', this.props.currentUser, "private");
        });

        this.state.socket.on('sendMsg', (message) => {
            console.log(message)
            this.setState((prevState) => ({ privateMessages: [...prevState.privateMessages, message] }));
        });

        this.state.socket.on('userList', (userList, socketId) => {
            console.log("userList", userList)
            this.setState((prevState) => { return { socketId, userList } });
        });
    }
    render() {
        return (

            <div className="privateMessages">
                {
                    this.state.privateMessages && this.state.privateMessages.length > 0 && this.state.privateMessages.map((message, index) =>
                        <div className={`private-message-wrapper ${message.sender == this.props.currentUser ? "current-user" : "other-user"}`} key={index}>
                            <div className="message-text">{message.message}</div>
                            <div className="message-date">{message.createdAt}</div>
                        </div>
                    )
                }
                <input type="text" onChange={this.handleMessage} placeholder="message" value={this.state.message} placeholder="Write Message" onKeyPress={this._handleKeyPress} />
            </div>

        );
    }
}
const mapDispatchToProps = (dispatch, props) => ({
    getConversation: (data) => { dispatch(getConversation(data)); },
    savePrivateMessage: (data) => { dispatch(savePrivateMessage(data)); },
});
const mapStateToProps = (state, props) => ({
    privateMessages: state.roomMessages.privateMessages || [],
    currentUser: state.auth.currentUser || JSON.parse(localStorage.getItem("currentUser")),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateChat);
