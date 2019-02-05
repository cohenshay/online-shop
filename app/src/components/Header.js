import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

export const Header = () => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>FaceBook</h1>
        </Link>
        <button className="button button--link" onClick={logout}>logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(undefined, mapDispatchToProps)(Header);
