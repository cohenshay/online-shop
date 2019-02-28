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
                    this.props.userList.filter(x => x.roomName == this.props.roomName).map((user, index) =>
                        <div className="poeple">
                            <div className="poepleImg">
                                <img src="images/20150731_191335 (3).jpg" />
                            </div>
                            <div className="poepleText">שי כהן</div>
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