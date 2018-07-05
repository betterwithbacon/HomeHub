import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="text-center">
    <h1>
      <a href="/#/">HomeHub Dashboard</a>
    </h1>
    <ul className="nav-menu">      
      <li className="lead">
        <Link to="/resources">Resources</Link>
      </li>
    </ul>
  </div>
);
export default Header;