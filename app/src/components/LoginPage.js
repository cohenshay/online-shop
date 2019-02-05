import React from 'react';
import { connect } from 'react-redux';
import { signin } from '../actions/auth';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-8">
          <div className="jumbotron">
            <form id="my_form">
              <div className="form-group">
                <label htmlFor="use rname">Email address</label>
                <input type="email" className="form-control" id="email" onChange={(e) => { this.setState({ email: e.target.value }) }} placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e) => { this.setState({ password: e.target.value }) }} placeholder="Enter Password" />
              </div>
              <button type="button" onClick={() => { this.props.signin({ email: this.state.email, password: this.state.password }) }} className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>

      </div>
    )
  }
}



const mapDispatchToProps = (dispatch) => ({
  signin: (params) => dispatch(signin(params))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
