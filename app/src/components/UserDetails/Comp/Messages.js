import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingPage from '../../LoadingPage';
import { getUserMessages } from '../../../actions/user';
import {getLikes} from '../../../actions/roomMessages';
class Messages extends Component {
    constructor() {
        super();
        this.state = {

        };
    }


    componentDidMount = () => {
        this.props.getUserMessages(this.props.currentUser);
        this.props.getLikes();
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.userMessages != this.props.userMessages) {

        }
    }
    //todo delete hard coded
    render() {
        if (this.props.userMessages.length > 0) {
            return (
                <div className="user-messages">
                    <h3>Previous Messages</h3>
                    {
                        this.props.userMessages.map((data, index) =>
                            <div className="message-wrapper" key={index}>
                                {false && <img
                                    src={`${window.location.origin}${data.users.filter(x => x._id != this.props.currentUser._id)[0].image}`}
                                    className="user-image pointer"
                                    onClick={() => this.props.goToPrivateChat(data.users.filter(x => x._id != this.props.currentUser._id)[0])} />}
                                <img
                                    src={`${window.location.origin}${"/images/messages.jpg"}`}
                                    className="user-image pointer"
                                    onClick={() => this.props.goToPrivateChat(data.users.filter(x => x._id != this.props.currentUser._id)[0])} />
                                <div className="user-name">
                                    gabriel
                            </div>
                                <div className="user-date">
                                    today
                            </div>
                            </div>)
                    }
                </div>
            );
        }
        return <LoadingPage />



    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getUserMessages: (user) => { dispatch(getUserMessages(user)) },
    getLikes:()=> {dispatch(getLikes())},

});
const mapStateToProps = (state, props) => ({
    userMessages: state.user.userMessages,
    userLikes:state.user.likes,
    userDisLikes:state.user.disLikes
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);