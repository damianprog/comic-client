import React from 'react';
import { Link } from 'react-router-dom';

import './nav-list.scss';

const NavList = () => (
  <nav>
    <ul>
      <li>
        <Link to="/sign/signin">Sign In</Link>
      </li>
      <li>
        <Link to="/sign/signup">Join</Link>
      </li>
    </ul>
  </nav>
);

export default NavList;
