import React, { Component } from "react";
import { connect } from 'react-redux';
class ConnectedUsers extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (

            <div className="poeplesWrap">
                <div className="title">חדר</div>
                {
                    this.props.userList.length > 0 &&
                    this.props.userList.map((user, index) =>
                        <div className="poeple" key={index}>
                            <div className="poepleImg" onClick={()=>this.props.setPrivateChatWith(user)}>
                                <img src={window.location.origin+`/images/users/${user.username}.jpg`} />
                            </div>
                            <div className="poepleText">{user.username}</div>
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
    // currentUser: state.auth.currentUser || JSON.parse(localStorage.getItem("currentUser")),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedUsers);
