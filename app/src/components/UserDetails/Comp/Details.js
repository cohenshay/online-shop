import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser } from '../../../actions/user'
class Details extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    handleInputChange = (event, a) => {
        const target = event.target;
        let value = "";
        if (target.type === "checkbox") value = target.checked;
        else if (target.type === "file") value = target.files[0];
        else value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };
    componentWillMount = () => {
        this.setState({ ...this.props.currentUser })
    }
    onFormSubmit = e => {
        e.preventDefault();
        var formData = new FormData();

        formData.append("fname", this.state.fname);
        formData.append("lname", this.state.lname);
        formData.append("address", this.state.address);
        formData.append("email", this.state.email);
        formData.append("username", this.state.username);
        formData.append("password", this.state.password);
        formData.append("image", this.state.image);
        formData.append("prevEmail", this.props.currentUser.email)
        this.props.updateUser(formData);
    };
    render() {
        return (
            <div className="details">
                <form onSubmit={this.onFormSubmit}>
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" className="user__fname" value={this.state.fname} onChange={this.handleInputChange} name="fname" />
                    </div>
                    <div className="field">
                        <label>Sure Name</label>
                        <input type="text" className="user__lname" value={this.state.lname} onChange={this.handleInputChange} name="lname" />
                    </div>
                    <div className="field">
                        <label>Address</label>
                        <input type="text" className="user__address" value={this.state.address} onChange={this.handleInputChange} name="address" />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" className="user__email" value={this.state.email} onChange={this.handleInputChange} name="email" />
                    </div>
                    <div className="field">
                        <label>Username</label>
                        <input type="text" className="user__username" value={this.state.username} onChange={this.handleInputChange} name="username" />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" className="user__password"  onChange={this.handleInputChange} name="password" />
                    </div>
                    <div className="field">
                        <label>Image</label>
                        <input type="file" className="user__image" onChange={this.handleInputChange} name="image" />
                    </div>
                    <div className="img-container">
                        <img src={window.location.origin + this.state.image} style={{ height: "500px", width: "400px", margin: "44px" }}></img>
                    </div>
                    <button type="submit">Upload</button>
                </form>
            </div>
        );



    }
}

const mapDispatchToProps = (dispatch, props) => ({
    updateUser: (user) => { dispatch(updateUser(user)) }
});
const mapStateToProps = (state, props) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Details);