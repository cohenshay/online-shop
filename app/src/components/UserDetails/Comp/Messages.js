import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingPage from '../../LoadingPage';
import { getUserMessages } from '../../../actions/user';
class Messages extends Component {
    constructor() {
        super();
        this.state = {

        };
    }


    componentDidMount = () => {
        this.props.getUserMessages(this.props.currentUser)
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.userMessages != this.props.userMessages) {

        }
    }
    render() {
        if (this.props.userMessages.length > 0) {
            return (
                <div className="user-messages">
                    <h3>Previous Messages</h3>
                    {
                        this.props.userMessages.map((data, index) =>
                        <div className="message-wrapper" key={index}>
                            <img 
                                src={`${window.location.origin}${data.users.filter(x => x._id != this.props.currentUser._id)[0].image}`} 
                                className="user-image pointer" 
                                onClick={()=>this.props.goToPrivateChat(data.users.filter(x => x._id != this.props.currentUser._id)[0])}/>
                            <div></div>
                        </div>)
                    }
                </div>
            );
        }
        return <LoadingPage />



    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getUserMessages: (user) => { dispatch(getUserMessages(user)) }
});
const mapStateToProps = (state, props) => ({
    userMessages: state.user.userMessages
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);