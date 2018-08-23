import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    const { locale } = this.props;
    return (
      <div id="header-region" className="row">
        

        <nav className="navbar navbar-default" role="navigation">
          <div className="collapse navbar-collapse navbar-ex1-collapse">
            <ul className="nav navbar-nav">
                <li className="home"><Link to="/">{locale.nav1 || "home"}</Link></li>
                <li className="about"><Link to="/about">{locale.nav3 || "about"}</Link></li>
                <li className="demo"><Link to="/demo">{locale.nav2 || "demo"}</Link></li>
                <li className="demo"><Link to="/svgEditor">{locale.nav2 || "svgEditor"}</Link></li>
            </ul>
          </div>
        </nav>

        
      </div>
    );
  }
}