import React from "react";
import { Link } from 'react-router-dom';

const Header: React.FunctionComponent = () => {
  return (<header>
    <nav>
      <div className="logo text-capitalize text-center">To Do List</div>
      <ul className="nav-links">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/user-list">
          <li>user List</li>
        </Link>
        <Link to="/post-list">
          <li>Posts</li>
        </Link>

      </ul>
    </nav>
  </header>);
};

export default Header;