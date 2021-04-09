import React from 'react';
import { Link } from 'react-router-dom';

import './nav-list.scss';

const NavList = ({ onItemClick }) => (
  <nav>
    <ul>
      <li onClick={onItemClick}>
        <Link to="/sign/signin">Sign In</Link>
      </li>
      <li onClick={onItemClick}>
        <Link to="/sign/signup">Join</Link>
      </li>
    </ul>
  </nav>
);

export default NavList;
