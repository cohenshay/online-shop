import React, { Component } from "react";
import { connect } from 'react-redux';
class PrivateChat extends Component {
    constructor() {
        super();
        this.state = {
            message:null
        };
    }
    handleMessage = (e)=>{
        this.setState({"message":e.target.value})
    }
    render() {
        return (

            <div className="privateMessages">
              {
                this.props.messages.length>0 && this.props.messages.map((message,index)=>
                <div>
                        {message.message}
                        {message.createdAt}
                        {message.sender}
                </div>)
              }
                <input type="text" onChange={this.handleMessage} placeholder="message" /><button onClick={()=>this.props.sendPrivateMessage(this.state.message)}>שלח</button>
            </div>

        );
    }
}
const mapDispatchToProps = (dispatch, props) => ({

});
const mapStateToProps = (state, props) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateChat);
