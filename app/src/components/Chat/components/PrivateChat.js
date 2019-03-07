import React, { Component } from "react";
import { connect } from 'react-redux';
class PrivateChat extends Component {
    constructor() {
        super();
        this.state = {
            message: null
        };
    }
    handleMessage = (e) => {
        this.setState({ "message": e.target.value })
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.sendPrivateMessage(this.state.message)
        }
    }
    render() {
        return (

            <div className="privateMessages">
                {
                    this.props.messages && this.props.messages.length > 0 && this.props.messages.map((message, index) =>
                        <div className={`private-message-wrapper ${message.sender==this.props.currentUser ? "current-user":"other-user"}`}>
                            <div className="message-text">{message}</div>
                            <div className="message-date">{createdAt}</div>
                        </div>
                    )
                }

            </div>

        );
    }
}
const mapDispatchToProps = (dispatch, props) => ({

});
const mapStateToProps = (state, props) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateChat);
