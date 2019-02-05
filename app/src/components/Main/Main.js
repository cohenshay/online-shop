import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../General/NavBar";


class Main extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return <NavBar/>;
  }
}
const mapDispatchToProps = (dispatch, props) => ({

});
const mapStateToProps = (state, props) => ({
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
