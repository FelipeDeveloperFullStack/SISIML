import React from "react";
import { NavLink } from "react-router-dom";

import logo from "assets/img/reactlogo.png";

class Sidebar extends React.Component {
 
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  render() {

    return (
      <div
        id="sidebar"
        className="sidebar"
      >

        <div className="logo">

          <a href="/" className="simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>

          <a href="/" className="simple-text logo-normal">
            #Sistema#
          </a>

        </div>

        <div className="sidebar-wrapper">
          <ul className="nav">

            {this.props.routes.map((prop, key) => {
              if (!prop.redirect) {
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : this.activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
