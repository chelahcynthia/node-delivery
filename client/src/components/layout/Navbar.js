import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

import "./index.css";
import { NavBarList } from "./NavBarList";

const NavBar = ({ auth, logoutUser }) => {
  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const { user } = auth;

  return (
    <React.Fragment>
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              <i className="material-icons">code</i>Tomato
            </Link>
            <div
              data-target="mobile-demo"
              className="sidenav-trigger show-on-med-and-down"
            >
              <i className="material-icons">menu</i>
            </div>
            {Object.keys(user || {}).length !== 0 ? (
              <ul
                id="nav-mobile"
                className="right hide-on-med-and-down list-margin"
              >
                <NavBarList user={user} onClick={onLogoutClick} />
              </ul>
            ) : null}
          </div>
        </nav>
      </div>
      <ul className="sidenav" id="mobile-demo">
        <NavBarList user={user} onClick={onLogoutClick} />
      </ul>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
