import React from 'react';
import { Link } from 'react-router-dom';

import './nav-list.scss';

const NavList = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Videos</Link>
      </li>
      <li>
        <Link to="/">Characters</Link>
      </li>
      <li>
        <Link to="/">Comics</Link>
      </li>
      <li>
        <Link to="/">Movies</Link>
      </li>
      <li>
        <Link to="/">TV Shows</Link>
      </li>
      <li>
        <Link to="/">Games</Link>
      </li>
      <li>
        <Link to="/">News</Link>
      </li>
      <li>
        <Link to="/">More</Link>
      </li>
    </ul>
  </nav>
);

export default NavList;
